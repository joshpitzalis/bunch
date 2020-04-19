import React from "react";

export default ({finalizeOrder}) => (
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
              Join the group order
            </h2>

            <section className="  bg-light ecommerce_36">
              <div className="container px-xl-0">
                <div
                  className="mt-35 d-none d-md-flex row justify-content-between"
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="0"
                >
                  <div className="col-xl-4 col-md-5 color-heading f-14 semibold text-uppercase sp-20 pb-15 ">
                    Item
                  </div>

                  <div className="col-md-2 color-heading f-14 semibold text-uppercase sp-20 pb-15 ">
                    Amount
                  </div>
                  <div className="col-xl-1 col-md-2 color-heading f-14 semibold text-uppercase sp-20 pb-15 ">
                    Price
                  </div>
                </div>
                <form
                  className="mv3 pv3 relative row justify-content-between align-items-stretch product"
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="0"
                >
                  <div className="col-xl-4 col-md-5 col-11 d-flex align-items-center  title">
                    <button
                      type="button"
                      className="link color-main f-18 medium"
                    >
                      Pao
                    </button>
                  </div>

                  <div className="mr-20 mr-md-0 col-md-2 col-auto d-flex align-items-center ">
                    <div className="relative quantity_selector">
                      <button
                        type="button"
                        className="absolute link color-heading control less"
                      >
                        <i className="fas fa-chevron-down" />
                      </button>
                      <input
                        name="quantity"
                        value="1"
                        max="9999"
                        className="input w-100 pl-20 pr-40 border-gray focus-action-2 placeholder-heading color-main"
                      />
                      <button
                        type="button"
                        className="absolute link color-heading control greater"
                      >
                        <i className="fas fa-chevron-up" />
                      </button>
                    </div>
                  </div>
                  <div className="relative col-xl-1 col-md-2 col d-flex align-items-center  price_holder">
                    <button
                      type="button"
                      className="absolute d-flex align-items-center justify-content-center remove_product"
                    >
                      <svg
                        width="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 1L1 15"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 1L15 15"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <div className="f-14 semibold text-uppercase sp-20 product_price">
                      <span>Rs.</span>
                      <span className="js-product-price">280</span>
                    </div>
                  </div>
                  <div className="d-md-none col-12 h-2 bg-gray hr" />
                </form>
                <div className="mt-25 row justify-content-end align-items-center">
                  <div
                    className="mt-10 mt-sm-0 col-xl-2 col-lg-3 col-sm-4 f-14 semibold text-uppercase sp-20 text-sm-right"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="ml-25 ml-sm-0 d-inline-block color-heading">
                      Total
                    </div>
                    <div className="ml-10 d-inline-block text-sm-left total">
                      <span>Rs.</span>
                      <span className="">280</span>
                    </div>
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
                      Your Name
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
                      Phone Number
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
                    <button
                      type="button"
                      className="btn w-full px-2 action-2 medium ph3"
                      onClick={finalizeOrder}
                    >
                      Finalise Order
                    </button>
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
