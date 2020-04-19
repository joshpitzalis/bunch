import React from "react";
import { Link } from "react-router-dom";
import NewOrder from "../features/orders/createNewOrder";

const firstTimeUser = false;

export default function Dashboard() {
  const [newOrder, setOrder] = React.useState(false);

  const handleCreateOrder = () => setOrder(true);

  if (firstTimeUser) {
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
                  Start your own minimum order
                </h2>
                <div
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="600"
                >
                  <button type="button" className="btn lg action-1">
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

  if (newOrder) {
    return <NewOrder />;
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
            <h2 className="small">2 Group Orders (1 is ready to order)</h2>
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
          <div
            className="mb-30 mb-md-0 col-md-6"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <div className="h-full radius10 pt-55 pb-50 bg-action-2 color-white">
              <div className="row justify-content-center">
                <div className="col-xl-9 col-10">
                  <div className="flex justify-between items-baseline">
                    <div className="mb-15 f-22 title">Coffee from G-shot</div>
                  </div>
                  <div className="text-adaptive">
                    5kg / 5kg ordered
                    <br />
                    Joshua is handling this order.
                  </div>
                  <Link to="/order/123" className="btn mt-40 sm action-1">
                    <small className="color-main action-3">
                      Ready for you to order
                    </small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-6"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <div
              className="h-full radius10 pt-55 pb-50 color-white bg-dark"
              id="showcase_10_block_with_bg"
            >
              <div className="row justify-content-center">
                <div className="col-xl-9 col-10">
                  <div className="mb-15 f-22 title">Bread from Paris Pao</div>
                  <div className="text-adaptive">
                    3 / 4 ordered
                    <br />
                    Sumukh is handling this order.
                  </div>
                  <Link to="/order/123" className="color-main">
                    <button
                      type="button"
                      className="mt-40 btn sm action-white f-16"
                    >
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
          <div
            className="mb-30 col-md-6"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <div className="h-full radius10 pt-55 pb-50 bg-gray">
              <div className="row justify-content-center">
                <div className="col-xl-9 col-10">
                  <div className="mb-15 f-22 title">Cold Cuts</div>
                  <div className="text-adaptive">
                    14 ordered 10kg last time
                    <br />
                    Anjali handled the order.
                  </div>
                  <Link
                    to="/order/123"
                    className="mt-40 btn sm action-white f-16"
                  >
                    <span className="color-main">Reorder</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mb-30 col-md-6"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <div className="h-full radius10 pt-55 pb-50 with_border">
              <div className="row justify-content-center">
                <div className="col-xl-9 col-10">
                  <div className="mb-15 f-22 title">Veg From Somewhere</div>
                  <div className="text-adaptive">
                    34 ordered Rs.5067 last time
                    <br />
                    Josh handled the order.
                  </div>
                  <Link to="/order/123" className="btn mt-40 sm action-1 f-16">
                    Reorder
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
