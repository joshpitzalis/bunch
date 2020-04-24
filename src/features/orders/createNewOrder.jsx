import React from "react";
import { useFormik } from "formik";
import { useToasts } from "@zeit-ui/react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import firebase from "../../utils/firebase";

export default ({ uid, setOrder }) => {
  const [, setToast] = useToasts();
  const history = useHistory();

  const [user, setUser] = React.useState({ name: "", mobile: "" });

  const formik = useFormik({
    initialValues: {
      what: "",
      where: "",
      when: "",
      who: "",
      minimum: "",
      minimumKind: "rupees",
      menu: ""
    },
    // validate: values => {
    //   const errors = {};
    //   if (!values.when) {
    //     errors.when = "It's optional, but we recommend setting a deadline.";
    //   }
    //   return errors;
    // },
    onSubmit: async (values, { setSubmitting }) => {
      const doc = firebase
        .firestore()
        .collection(`orders`)
        .doc();

      firebase
        .firestore()
        .collection(`orders`)
        .doc(doc.id)
        .set({ ...values, id: doc.id, members: [] }, { merge: true })
        .then(() => history.push(`/order/${doc.id}`))
        .catch(error => {
          setToast({
            text: `${error.code} ${error.message}`,
            type: "warning"
          });
          setSubmitting(false);
        });
    }
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
    isSubmitting
  } = formik;

  return (
    <section className="pt-105 pb-100 bg-light form_14">
      <div className="container px-xl-0">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2
              className="small text-center pb3"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="0"
            >
              Start A New Group Order
            </h2>

            <form onSubmit={handleSubmit} className="pa4 br3">
              <section className="bg-light ecommerce_36">
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
                        name="what"
                        required
                        className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                        onChange={handleChange}
                        value={values.what}
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
                        type="text"
                        name="where"
                        required
                        className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                        onChange={handleChange}
                        value={values.where}
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
                        Include a deadline for the final order?
                      </div>
                      <input
                        type="text"
                        name="when"
                        className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                        onChange={handleChange}
                        value={values.when}
                        onBlur={handleBlur}
                      />
                      {errors && errors.when && touched.when && (
                        <small className="orange center pt3">
                          {errors.when}
                        </small>
                      )}
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
                        type="text"
                        name="who"
                        required
                        className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                        onChange={handleChange}
                        value={values.who}
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
                      <div className="input w-full border-gray focus-action-1 color-heading placeholder-heading  ">
                        <input
                          type="number"
                          name="minimum"
                          required
                          placeholder="0"
                          onChange={handleChange}
                          value={values.minimum}
                          className="tr pt2"
                          min="0"
                        />
                        <select
                          className="w4 pt2"
                          name="minimumKind"
                          value={values.minimumKind}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="rupees">Rupees</option>
                          <option value="kilograms">Kilograms</option>
                          <option value="pieces">Pieces</option>
                        </select>
                      </div>
                    </div>
                    <div
                      className="col-md-6 mb-35 block"
                      data-aos-duration="600"
                      data-aos="fade-down"
                      data-aos-delay="300"
                    >
                      <div className="mb-10 f-14 semibold text-uppercase sp-20">
                        Link to pricelist?
                      </div>
                      <input
                        type="text"
                        name="menu"
                        className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                        onChange={handleChange}
                        value={values.menu}
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
                        disabled={isSubmitting}
                        type="submit"
                        className="btn w-full px-2 action-2 medium ph3"
                      >
                        Create Group Order Sheet
                      </button>
                    </div>

                    <div
                      className="col-xl-3 col-lg-4 col-md-5 col-sm-6"
                      data-aos-duration="600"
                      data-aos="fade-down"
                      data-aos-delay="300"
                    >
                      <button
                        onClick={() => setOrder(false)}
                        type="submit"
                        className="btn w-full px-2 action-3 medium ph3"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string
};

const defaultProps = {
  handleClick: () => {},
  className: ""
};

const Close = ({ handleClick, className }) => (
  <div className={className}>
    <button
      type="button"
      className="absolute d-flex align-items-center justify-content-center remove_product"
      onClick={handleClick}
    >
      <svg
        width="12"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 1L1 15" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 1L15 15" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  </div>
);

Close.propTypes = propTypes;
Close.defaultProps = defaultProps;
