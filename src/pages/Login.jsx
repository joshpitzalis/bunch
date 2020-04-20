import React from "react";

// Photo by Markus Spiske on Unsplash
// https://unsplash.com/photos/ezYZfFnzARM

import { useHistory } from "react-router-dom";
import { useToasts } from "@zeit-ui/react";

export default () => {
  const history = useHistory();

  const login = () => history.replace("/dashboard/josh");

  const [, setToast] = useToasts();

  return (
    <div>
      <section className="pt-100 pb-100 bg-dark color-filter-dark-2 form_4 vh-100">
        <div className="container px-xl-0">
          <div className="row align-items-center">
            <div className="col-xl-1" />
            <div className="col-xl-4 col-lg-5 col-md-8 color-white">
              <h1
                className="mb5 f-headline "
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                Bunch
              </h1>
              <h2
                className="mb3 small"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                Organise minimum food orders with your friends.
              </h2>
            </div>
            <div className="col-lg-1" />
            <div className="mt-50 mt-lg-0 col-xl-5 col-lg-6 col-md-8">
              <div className="bg-light radius10">
                <div className="form_4_menu text-center">
                  <button
                    type="button"
                    className="link relative f-14 semibold text-uppercase sp-20 color-heading lh-68"
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="link relative relative f-14 semibold text-uppercase sp-20 color-heading lh-68"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-65 pb-80 slider">
                  <div>
                    <form>
                      <div className="row justify-content-center no-gutters">
                        <div className="col-xl-9 col-sm-10">
                          <div className="px-15">
                            <input
                              type="email"
                              placeholder="Your email"
                              className="input mb-30 w-full border-gray focus-action-1 color-heading placeholder-heading text-center text-md-left"
                            />
                            <input
                              type="password"
                              placeholder="Your password"
                              className="input mb-30 w-full border-gray focus-action-1 color-heading placeholder-heading text-center text-md-left"
                            />
                            <button
                              type="button"
                              className="btn mt-10 w-full action-1"
                              onClick={login}
                            >
                              Create an Account
                            </button>
                            {/* <div className="f-14 color-heading text-center mt-20 separate">
														<span className="d-inline-block px-10 bg-light relative">or</span>
													</div>
													<a href="#" className="btn mt-20 w-full action-twitter">Login via Twitter</a> */}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div>
                    <form>
                      <div className="row justify-content-center no-gutters">
                        <div className="col-xl-9 col-sm-10">
                          <div className="px-15">
                            <input
                              type="email"
                              placeholder="Your email"
                              className="input mb-30 w-full border-gray focus-action-1 color-heading placeholder-heading text-center text-md-left"
                            />
                            <input
                              type="password"
                              name="password"
                              placeholder="Your password"
                              className="input mb-30 w-full border-gray focus-action-1 color-heading placeholder-heading text-center text-md-left"
                            />
                            <button
                              type="button"
                              className="btn mt-10 w-full action-1"
                              onClick={() =>
                                setToast({
                                  text:
                                    "The Evil Rabbit jumped over the fence.",
                                  type: "warning"
                                })}
                            >
                              Sign In
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
