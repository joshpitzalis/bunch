import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "@zeit-ui/react";
import NewOrder from "../features/orders/createNewOrder";
import firebase from "../utils/firebase";

const orderedSoFar = (minimumKind, members) => {
  const orderTotalAmount =
    members &&
    members.reduce(
      (acc, { order }) =>
        acc + order.reduce((_acc, { amount }) => _acc + Number(amount), 0),
      0
    );

  return minimumKind === "rupees"
    ? orderTotalAmount
    : members &&
        members.reduce(
          (acc, { order }) =>
            acc +
            order.reduce((_acc, { quantity }) => _acc + Number(quantity), 0),
          0
        );
};

const useGetUserOrders = uid => {
  const [orders, setOrders] = React.useState([]);
  const [, setToast] = useToasts();
  React.useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = firebase
        .firestore()
        .collection("orders")
        .where("people", "array-contains", uid)
        .onSnapshot(collection => {
          const myOrders = collection.docs.map(doc => doc.data());
          setOrders(myOrders);
        });
    } catch (error) {
      setToast({
        text: `${error.code} ${error.message}`,
        type: "warning"
      });
    }
    return () => unsubscribe();
  }, [uid]);

  return orders;
};

export default function Dashboard({ auth }) {
  const [newOrder, setOrder] = React.useState(false);

  const handleCreateOrder = () => setOrder(true);

  const orders = useGetUserOrders(auth.uid);

  const [, setToast] = useToasts();
  const handleArchive = id =>
    firebase
      .firestore()
      .collection("orders")
      .doc(id)
      .set({ status: "archived" }, { merge: true })
      .catch(error =>
        setToast({
          text: `${error.code} ${error.message}`,
          type: "warning"
        })
      );

  const handleReorder = id =>
    firebase
      .firestore()
      .collection("orders")
      .doc(id)
      .set({ status: "null" }, { merge: true })
      .catch(error =>
        setToast({
          text: `${error.code} ${error.message}`,
          type: "warning"
        })
      );

  if (newOrder) {
    return (
      <div>
        <NewOrder uid={auth.uid} setOrder={setOrder} />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <section className="pt-100 pb-100 bg-light text-center call_to_action_3">
        <div className="container px-xl-0">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="px-50 pt-80 pb-85 radius10 ba b--light-gray inner">
                {/* <div className="f-14 semibold text-uppercase sp-20" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">Start a new order</div> */}
                <h2
                  className="mt-20 mb-45 small"
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="300"
                >
                  Create your first group order.
                </h2>
                <div
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="600"
                >
                  <button
                    type="button"
                    onClick={handleCreateOrder}
                    className="btn lg action-1"
                  >
                    Start a new order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-100 pb-95 bg-light showcase_10">
      <div className="container px-xl-0">
        <div className="row justify-content-start align-items-center align-items-lg-end text-center">
          <div
            className="col-md-8 col-sm-7 text-sm-left "
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <h2 className="small">
              {`${
                orders.filter(list => list.status !== "archived").length
              } Active Group             ${
                orders.length === 1 ? "Order" : "Orders"
              }`}
            </h2>
          </div>
          <div
            className="col-md-4 col-sm-5 text-sm-right"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <button
              type="button"
              onClick={handleCreateOrder}
              className="btn mt-20 mt-sm-0 size50 border-gray color-main"
            >
              Start a new order
            </button>
          </div>
        </div>
        <OrderCards
          orders={orders}
          handleReorder={handleReorder}
          handleArchive={handleArchive}
        />

        {!!orders.filter(list => list.status === "archived").length && (
          <div className="row justify-content-start align-items-center align-items-lg-end text-center">
            <div
              className="col-md-8 col-sm-7 text-sm-left"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="0"
            >
              <h2 className="small mt6">
                {`${
                  orders.filter(list => list.status === "archived").length
                } Active Group             ${
                  orders.length === 1 ? "Order" : "Orders"
                }`}
              </h2>
            </div>
          </div>
        )}
        <OrderCards
          orders={orders}
          archived
          handleReorder={handleReorder}
          handleArchive={handleArchive}
        />
      </div>
    </section>
  );
}

const OrderCards = ({ orders, archived, handleReorder, handleArchive }) => (
  <div className="mt-40 row align-items-stretch">
    {orders &&
      orders
        .filter(list =>
          archived ? list.status === "archived" : list.status !== "archived"
        )
        .map(
          (
            { what, when, where, who, id, minimumKind, members, minimum },
            index
          ) => {
            const ready = orderedSoFar(minimumKind, members) > minimum;
            return (
              <div
                key={id}
                className="mb-30  col-md-6"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                <div
                  className={`h-full radius10 pt-55 pb-50  ${
                    !archived && ready
                      ? "bg-action-2 color-white"
                      : "ba b--light-gray"
                  }`}
                >
                  <div className="row justify-content-center">
                    <div className="col-xl-9 col-10">
                      <div className="flex justify-between items-baseline">
                        <div className="mb-15 f-22 title">
                          {!archived && ready && (
                            <Link to={`/order/${id}`}>🔗</Link>
                          )}
{' '}
{" "}
                          {`${what} from ${where}`}
                        </div>
                      </div>
                      <div className="text-adaptive">
                        {!archived && `${who} is handling this order.`}
                        <br />
                        {`${orderedSoFar(
                          minimumKind,
                          members
                        )} ${minimumKind} / ${minimum} ${minimumKind} ordered`}
                        <br />
                        {!archived && `Deadline set for ${when}`}
                      </div>
                      {ready ? (
                        <button
                          type="button"
                          className="btn mt-40 sm action-1"
                          onClick={() =>
                            archived ? handleReorder(id) : handleArchive(id)
                          }
                        >
                          <small className="color-main action-3">
                            {archived
                              ? "Re-order"
                              : "Archive when you place order"}
                          </small>
                        </button>
                      ) : (
                        <Link
                          to={`/order/${id}`}
                          className=" mt-40 mt-40 f6  no-underline br-pill ba ph3 pv2 mb2 dib light-gray bw1"
                        >
                          <small className="color-main action-2">View</small>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
  </div>
);
