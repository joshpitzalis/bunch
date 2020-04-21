import React from "react";
import { useFormik } from "formik";
import { useToasts } from "@zeit-ui/react";
import { useHistory } from "react-router-dom";
import firebase from "../../utils/firebase";

export default ({ uid }) => {
  const [, setToast] = useToasts();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      what: "",
      where: "",
      when: "",
      who: "",
      minimum: "",
      menu: ""
    },
    validate: values => {
      const errors = {};
      if (!values.when) {
        errors.when = "It's optional, but we recommend setting a deadline.";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const doc = firebase
        .firestore()
        .collection(`orders`)
        .doc();

      firebase
        .firestore()
        .collection(`orders`)
        .doc(doc.id)
        .set({ ...values, members: [uid], id: doc.id }, { merge: true })
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
              className="small text-center"
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
                      <input
                        type="text"
                        name="minimum"
                        required
                        className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
                        onChange={handleChange}
                        value={values.minimum}
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
