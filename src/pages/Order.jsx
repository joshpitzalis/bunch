import React from "react";
import { useParams } from "react-router-dom";
import JoinOrder from "../features/orders/JoinOrder";
import firebase from "../utils/firebase";

export default function Order({auth}) {
  const [orderJoined, setJoin] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState({});

  const { orderId } = useParams();

  const handleJoinOrder = () => setJoin(true);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("orders")
      .doc(orderId)
      .onSnapshot(doc => setOrderDetails(doc.data()));
    return () => unsubscribe();
  }, [orderId]);

  const { what, where, when, who, minimum, menu, members } = orderDetails;

  const orderTotalQuantity =
    members &&
    members.reduce(
      (acc, { order }) =>
        acc + order.reduce((_acc, { quantity }) => _acc + Number(quantity), 0),
      0
    );
  const orderTotalAmount =
    members &&
    members.reduce(
      (acc, { order }) =>
        acc + order.reduce((_acc, { amount }) => _acc + Number(amount), 0),
      0
    );

  const myOrderIndex =
    members && members.findIndex(item => item.uid === auth && auth.uid);

  const [user, setUser] = React.useState({ name: "", mobile: "" });

  React.useEffect(() => {
    let unsubscribe;
    if (auth && auth.uid) {
      unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .onSnapshot(doc => setUser(doc.data()));
    }
    return () => {
      if (auth && auth.uid) {
        unsubscribe();
      }
    };
  }, [auth && auth.uid]);

  return (
    <>
      <section className="pt-80 pb-80 bg-light content_1">
        <div className="container px-xl-0">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-10 text-center">
              <div
                className="f-14 color-heading semibold text-uppercase sp-20"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                Group Order
              </div>
              <h2
                className="mt-25"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                {`${what} from ${where}`}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-20 bg-light content_10">
        <div className="container px-xl-0">
          <div className="row flex justify-center">
            <div className="col-xl-3 col-lg-4 col-md-7">
              <div
                className=" lh-title mb-10  bold  sp-20 color-heading text-adaptive flex flex-column items-center w5"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                <br />
                Minimum order
                <br />
                <span className="f1 ttu pt3">{minimum}</span>
                <br />
              </div>
            </div>
            {!!menu && (
              <div
                className=" lh-title mb-10  bold  sp-20 color-heading text-adaptive flex flex-column items-center w5"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                <br />
                Link To
                <br />
                <span className="f1 ttu pt3 underline">Prices</span>
                <br />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pt-50 pb-90 bg-light content_33">
        <div className="container px-xl-0 pt-40">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h4
                className="mb-20  text-center"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                {`We need to order ${
                  minimum - orderTotalQuantity > 0
                    ? minimum - orderTotalQuantity
                    : 0
                } more ${when && `by ${when}`}
to complete the order.`}
              </h4>
              <div className="table-responsive-shadow">
                <div className="table-responsive-xl">
                  <table className="table table-borderless table-striped m-0 w-970">
                    <thead>
                      <tr
                        data-aos-duration="600"
                        data-aos="fade-down"
                        data-aos-delay="150"
                      >
                        <th
                          className="color-heading f-14 semibold text-uppercase sp-20"
                          scope="col"
                        >
                          Name
                        </th>
                        <th
                          className="color-heading f-14 semibold text-uppercase sp-20"
                          scope="col"
                        >
                          Order
                        </th>
                        <th
                          className="color-heading f-14 semibold text-uppercase sp-20 tr"
                          scope="col"
                        >
                          Amount
                        </th>
                        {/* <th className="color-heading f-14 semibold text-uppercase sp-20" scope="col">Paid</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {members &&
                        !!members.length &&
                        members.map(({ name, mobile, order }, index) => (
                          <tr
                            key={index}
                            data-aos-duration="600"
                            data-aos="fade-down"
                            data-aos-delay="300"
                          >
                            <td>{`${name} +${mobile}`}</td>
                            <td className="color-heading">
                              {order.reduce(
                                (acc, item) => acc + item.quantity,
                                0
                              )}
                            </td>
                            <td className="tr">
                              {order.reduce(
                                (acc, item) => acc + item.amount,
                                0
                              )}
                            </td>
                          </tr>
                        ))}

                      <tr
                        data-aos-duration="600"
                        data-aos="fade-down"
                        data-aos-delay="450"
                      >
                        <td>
                          <b>Total</b>
                        </td>
                        <td className="color-heading">
                          <b>{orderTotalQuantity}</b>
                        </td>
                        <td className="tr">
                          <b>{orderTotalAmount}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {orderJoined ? (
        <JoinOrder
          finalizeOrder={() => setJoin(false)}
          auth={auth}
          orderId={orderId}
          members={members}
          myOrderIndex={myOrderIndex}
          name={user && user.name}
          mobile={user && user.mobile}
        />
      ) : (
        <section className="pt-30 pb-95 bg-light text-center call_to_action_1">
          <div className="container px-xl-0">
            <div className="row justify-content-center">
              {/* <div className="col-xl-8 col-lg-10">
						<h2 data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">Get Startup Framework</h2>
					</div> */}
              <div className="col-xl-7 col-lg-9 col-md-10">
                <div
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="600"
                >
                  <button
                    type="button"
                    onClick={handleJoinOrder}
                    className="btn mb-30 lg action-1"
                  >
                    {auth && auth.uid && myOrderIndex
                      ? "Change my order"
                      : "Join the group order"}
                  </button>
                </div>
                {/* <div className="color-heading text-adaptive" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">Commercial License
						</div> */}
                <div
                  className="mt-20 mb-60 f-22 color-heading text-adaptive description"
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="300"
                >
                  {`${who} is handling the final order and sorting out pick up.`}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// const copy = () =>
// <section className="bg-dark color-white text-center text-lg-left call_to_action_11">
//   <div className="container px-xl-0 pt-45 pb-45">
//     <div className="row align-items-center justify-content-center">
//       <div className="col-xl-7 col-lg-8">
//         <h6 className="f-22 regular text-adaptive" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">www.
//         </h6>
//       </div>
//       <div className="col-xl-3 col-lg-4 text-lg-right" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
//         <button className="btn mt-30 mt-lg-0 lg action-3">Copy to clipboard</button>
//       </div>
//     </div>
//   </div>
// </section>
