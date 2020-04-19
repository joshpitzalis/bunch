import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <>
    <section className="pt-105 pb-100 bg-light form_14">
      <div className="container px-xl-0">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2
              className="small text-center"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="0"
            >
              Create a new group order
            </h2>

            <section className="  bg-light ecommerce_36">
              <div className="container px-xl-0">
                <div className="row mt5">
                  <div
                    className="col-md-6 mb-35 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="0"
                  >
                    <div className="mb-10 f-14 semibold text-uppercase sp-20">
                      What are we ordering?
                    </div>
                    <input
                      type="text"
                      name="firstname"
                      required
                      className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                    />
                  </div>
                  <div
                    className="col-md-6 mb-35 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="mb-10 f-14 semibold text-uppercase sp-20">
                      From Where?
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                    />
                  </div>
                </div>

                <div className="row mt5">
                  <div
                    className="col-md-6 mb-35 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="0"
                  >
                    <div className="mb-10 f-14 semibold text-uppercase sp-20">
                      Deadline for the order
                    </div>
                    <input
                      type="text"
                      name="firstname"
                      required
                      className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                    />
                  </div>
                  <div
                    className="col-md-6 mb-35 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="mb-10 f-14 semibold text-uppercase sp-20">
                      Who will handle Delivery?
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                    />
                  </div>
                </div>

                <div className="row mt5">
                  <div
                    className="col-md-6 mb-35 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="0"
                  >
                    <div className="mb-10 f-14 semibold text-uppercase sp-20">
                      Minimum order
                    </div>
                    <input
                      type="text"
                      name="firstname"
                      required
                      className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                    />
                  </div>
                  <div
                    className="col-md-6 mb-35 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="mb-10 f-14 semibold text-uppercase sp-20">
                      Link to menu or pricelist?
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                    />
                  </div>
                </div>

                <div className="mt-40 row flex-column-reverse flex-sm-row justify-content-center align-items-center">
                  <div
                    className="col-xl-3 col-lg-4 col-md-5 col-sm-6"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <Link to="/order/123">
                      <button
                        type="button"
                        className="btn w-full px-2 action-2 medium ph3"
                      >
                        Create Group Order Sheet
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </>
);
