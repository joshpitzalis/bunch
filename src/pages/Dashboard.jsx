import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "@zeit-ui/react";
import NewOrder from "../features/orders/createNewOrder";
import firebase from "../utils/firebase";

const useGetUserOrders = uid => {
  const [orders, setOrders] = React.useState([]);
  const [, setToast] = useToasts();
  React.useEffect(
    () =>
      firebase
        .firestore()
        .collection("orders")
        .where("people", "array-contains", uid)
        .get()
        .then(collection => {
          const myOrders = collection.docs.map(doc => doc.data());
          setOrders(myOrders);
        })
        .catch(error =>
          setToast({
            text: `${error.code} ${error.message}`,
            type: "warning"
          })
        )[uid]
  );

  return orders;
};

export default function Dashboard({auth}) {
  const [newOrder, setOrder] = React.useState(false);

  const handleCreateOrder = () => setOrder(true);

  const orders = useGetUserOrders(auth.uid);

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
              {`${orders.length} Active Group             ${
                orders.length > 1 ? "Orders" : "Order"
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
        <div className="mt-40 row align-items-stretch">
          {orders &&
            orders.map(({ what, when, where, who, id }, index) => {
              const first = index === 0;
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
                      first ? "bg-action-2 color-white" : "ba b--light-gray"
                    }`}
                  >
                    <div className="row justify-content-center">
                      <div className="col-xl-9 col-10">
                        <div className="flex justify-between items-baseline">
                          <div className="mb-15 f-22 title">
                            {`${what} from ${where}`}
                          </div>
                        </div>
                        <div className="text-adaptive">
                          {`${who} is handling this order.`}
                          <br />
                          5kg / 5kg ordered
                        </div>
                        {first ? (
                          <Link
                            to={`/order/${id}`}
                            className="btn mt-40 sm action-1"
                          >
                            <small className="color-main action-3">
                              Ready for you to order
                            </small>
                          </Link>
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
            })}
        </div>

        <div className="row justify-content-start align-items-center align-items-lg-end text-center">
          <div
            className="col-md-8 col-sm-7 text-sm-left"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <h2 className="small mt6">2 Past Orders</h2>
          </div>
        </div>
        <div className="mt-40 row align-items-stretch">
          {orders &&
            orders.map(order => (
              <div
                key={order.id}
                className="mb-30 col-md-6 pointer"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                <div className="h-full radius10 pt-55 pb-50 ba b--light-gray bg-light-gray ">
                  <div className="row justify-content-center">
                    <div className="col-xl-9 col-10">
                      <div className="flex justify-between items-baseline">
                        <div className="mb-15 f-22 title">
                          Coffee from G-shot
                        </div>
                      </div>
                      <div className="text-adaptive">
                        5kg / 5kg ordered
                        <br />
                        Joshua is handling this order.
                      </div>
                      <Link
                        to={`/order/${order.id}`}
                        className=" mt-40 f6  no-underline br-pill ba ph3 pv2 mb2 dib dark-gray bg-white b--white"
                      >
                        <small className="color-main action-3">Re-order</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
