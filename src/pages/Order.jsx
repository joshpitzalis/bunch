import React from "react";
import JoinOrder from "../features/orders/JoinOrder";

export default function Order() {
  const [orderJoined, setJoin] = React.useState(false);

  const handleJoinOrder = () => setJoin(true);

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
                Bread from Paris Pao
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-20 bg-light content_10">
        <div className="container px-xl-0">
          <div className="row flex-row-reverse justify-content-end">
            <div className="col-xl-3 col-lg-4 col-md-7">
              <div
                className=" lh-title mb-10  bold  sp-20 color-heading text-adaptive"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                <br />
                Minimum order
                <br />
                <span className="f1 ttu pt3">4 Paos</span>
                <br />
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <ul
                className="f-22 text-adaptive"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                <li>Deadline for the group order is 4pm, 20th April</li>
                <li>Sumukh Shetty is handling the final order.</li>
                <li>Sumukh Shetty is sorting out delivery.</li>
              </ul>
            </div>
            <div className="col-xl-1" />
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
                We need to order 1 more pao to complete the order.
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
                      <tr
                        data-aos-duration="600"
                        data-aos="fade-down"
                        data-aos-delay="300"
                      >
                        <td>Josh</td>
                        <td className="color-heading">2 Paos</td>
                        <td className="tr">Rs.345</td>
                      </tr>
                      <tr
                        data-aos-duration="600"
                        data-aos="fade-down"
                        data-aos-delay="450"
                      >
                        <td>Sumukh</td>
                        <td className="color-heading">1 pao</td>
                        <td className="tr">Rs. 280</td>
                      </tr>

                      <tr
                        data-aos-duration="600"
                        data-aos="fade-down"
                        data-aos-delay="450"
                      >
                        <td>
                          <b>Total</b>
                        </td>
                        <td className="color-heading">3 pao</td>
                        <td className="tr">Rs. 625</td>
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
        <JoinOrder finalizeOrder={() => setJoin(false)} />
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
                    Join the group order
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
                  If you want to add to the order click the Join button above.
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
