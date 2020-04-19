import React from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();

  if (location?.pathname === "/") {
    return null;
  }

  return (
    <footer className="pt-45 pb-60 bg-dark color-white text-center text-lg-left footer_13">
      <div className="container px-xl-0">
        <div
          className="lh-40 footer_links"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="0"
        >
          <button
            type="button"
            className="btn f-14 semibold text-uppercase sp-20 color-white mx-10"
          >
            About
          </button>
          <button
            type="button"
            className="btn f-14 semibold text-uppercase sp-20 color-white mx-10"
          >
            Pricing
          </button>

          <button
            type="button"
            className="btn f-14 semibold text-uppercase sp-20 color-white ml-10"
          >
            Contact
          </button>

          <button
            type="button"
            className="btn f-14 semibold text-uppercase sp-20 color-white ml-10"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className="btn f-14 semibold text-uppercase sp-20 color-white ml-10"
          >
            Terms
          </button>
        </div>
        <div data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
          <div className="mt-35 mb-40 hr h-2 bg-white op-3" />
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="row">
              <div
                className="col-xl-4 col-lg-5"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                <button type="button" className="btn logo color-white">
                  Bunch
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-lg-5 text-lg-right"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            <span className="d-inline-block socials">
              <button type="button" className="btn color-white mx-15">
                <i className="fab fa-twitter" />
              </button>
              <button type="button" className="btn color-white mx-15">
                <i className="fab fa-facebook-f" />
              </button>
              <button type="button" className="btn color-white ml-15">
                <i className="fab fa-google-plus-g" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
