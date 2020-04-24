import React from "react";
import { useFormik } from "formik";
import { useToasts } from "@zeit-ui/react";
import PhoneInput from "react-phone-input-2";
import firebase from "../../utils/firebase";
import "react-phone-input-2/lib/style.css";

export default ({
  members,
  finalizeOrder,
  orderId,
  myOrderIndex,
  auth,
  name,
  mobile,
  minimumKind
}) => {
  React.useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible"
      }
    );
    return () => window.recaptchaVerifier.clear();
  }, []);

  const [, setToast] = useToasts();

  const uid = auth && auth.uid ? auth.uid : "";

  const writeUserToDatabase = (name, mobile, uid) =>
    firebase
      .firestore()
      .doc(`users/${uid}`)
      .set({ name, mobile, uid }, { merge: true })
      .catch(console.error);

  const registerUser = async (values, setValues) => {
    const { name, mobile } = values;
    await new firebase.auth.PhoneAuthProvider()
      .verifyPhoneNumber(`+${mobile}`, window.recaptchaVerifier)
      .then(verificationId => {
        const verificationCode = window.prompt(
          `Please enter the verification code that was sent to your mobile device.`
        );
        return firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
      })
      .then(phoneCredential =>
        firebase.auth().signInWithCredential(phoneCredential)
      )
      .then(async ({ user }) => {
        await writeUserToDatabase(name, mobile, user.uid);
        values.uid = user.uid;
        console.log({ values });

        await setValues(values);
      })
      .catch(error => {
        // tk, write a more human readable message for each kind of error
        setToast({
          text: `${error.code} ${error.message}`,
          type: "warning"
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      name,
      mobile,
      uid,
      order:
        myOrderIndex > 0
          ? members[myOrderIndex].order
          : [{ item: "", quantity: 0, amount: 0 }]
    },

    validate: values => {
      const errors = {};
      if (
        values.order.some(
          ({ item, quantity, amount }) => !item || !quantity || !amount
        )
      ) {
        errors.order =
          "Orders cannot contain empty fields, please update or delete.";
      }

      if (!values.name || !values.mobile) {
        errors.order =
          "Please login or create an account by filling out the fields above.";
      }
      return errors;
    },

    onSubmit: async (values, { setSubmitting, setValues }) => {
      if (myOrderIndex > 0) {
        members[myOrderIndex] = values;
      } else {
        members = [...members, values];
      }

      if (!uid) {
        await registerUser(values, setValues);
      }

      firebase
        .firestore()
        .collection(`orders`)
        .doc(orderId)
        .set(
          {
            members,
            people: firebase.firestore.FieldValue.arrayUnion(values.uid)
          },
          { merge: true }
        )
        .then(finalizeOrder)
        .catch(error => {
          setSubmitting(false);
          setToast({
            text: `${error.code} ${error.message}`,
            type: "warning"
          });
        });
    }
  });

  const {
    handleSubmit,
    values,
    isSubmitting,
    setValues,
    handleChange,
    errors,
    handleBlur,
    touched
  } = formik;

  return (
    <form>
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
                      {`Quantity (in ${minimumKind})`}
                    </div>
                    <div className="col-xl-3 col-md-3 color-heading f-14 semibold text-uppercase sp-20 pb-15 ">
                      Total Cost
                    </div>
                  </div>

                  {values.order &&
                    !!values.order.length &&
                    values.order.map((item, index) => (
                      <OrderRow
                        key={index}
                        {...item}
                        index={index}
                        setValues={setValues}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    ))}

                  <div className="mt-25 row justify-content-between align-items-center">
                    <button
                      type="button"
                      className="btn ml3 ph3 action-3 small ph3"
                      onClick={() => {
                        values.order = [
                          ...values.order,
                          {
                            item: "",
                            quantity: "",
                            amount: ""
                          }
                        ];

                        setValues(values);
                      }}
                    >
                      + Add New Item
                    </button>
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
                        <span className="">
                          {values.order &&
                            values.order.reduce(
                              (acc, item) => acc + item.amount,
                              0
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!uid && (
                    <SignupBox
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setValues={setValues}
                    />
                  )}

                  <div className="mt-40 row flex-column-reverse flex-sm-row justify-content-center align-items-center">
                    <div
                      className="col-xl-3 col-lg-4 col-md-5 col-sm-6 flex flex-column items-center"
                      data-aos-duration="600"
                      data-aos="fade-down"
                      data-aos-delay="300"
                    >
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn w-full px-2 action-2 medium ph3"
                        onClick={handleSubmit}
                        id="recaptcha"
                      >
                        Finalise My Order
                      </button>
                      {touched.order && errors.order && (
                        <small className="red center tc w-100 mt3">
                          {errors.order}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

const OrderRow = ({
  quantity,
  item,
  amount,
  index,
  setValues,
  values,
  handleChange,
  handleBlur
}) => (
  <div
    className="mv3 pv3 relative row justify-content-between align-items-stretch bb b--light-gray "
    data-aos-duration="600"
    data-aos="fade-down"
    data-aos-delay="0"
  >
    <div className="col-xl-4 col-md-5 col-11 d-flex align-items-center title">
      <textarea
        rows={3}
        className="color-main f-18 flex-fill"
        value={item}
        name={`order[${index}.item]`}
        onChange={handleChange}
        placeholder="Click to add item name (add quanity units in brackets grams, pieces, kg, etc)"
        onBlur={handleBlur}
      />
    </div>

    <div className=" mr-md-0 col-md-2 col-auto d-flex align-items-center  ">
      <div className="relative quantity_selector">
        <input
          type="number"
          value={quantity}
          name={`order[${index}.quantity]`}
          className="input w4 border-gray focus-action-2 placeholder-heading color-main"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
    <div className="relative col-xl-3 col-md-3 col d-flex align-items-center  price_holder">
      <button
        type="button"
        className="absolute d-flex align-items-center justify-content-center remove_product"
        onClick={() => {
          values.order = [
            ...values.order.slice(0, index),
            ...values.order.slice(index + 1)
          ];
          setValues(values);
        }}
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
      <div className="f-14 semibold text-uppercase sp-20 ">
        <input
          type="number"
          value={amount}
          name={`order[${index}.amount]`}
          className="input w4 border-gray focus-action-2 placeholder-heading color-main"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
    <div className="d-md-none col-12 h-2 bg-gray hr" />
  </div>
);

const SignupBox = ({ handleChange, handleBlur, values, setValues }) => {
  const { mobile } = values;
  return (
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
          required
          className="input w-full border-gray focus-action-1 color-heading placeholder-heading"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
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
        <PhoneInput
          country="in"
          countryCodeEditable
          autoFormat
          buttonClass="mt2 h2"
          containerClass="input border-gray "
          value={mobile}
          onChange={e => {
            values.mobile = e;
            setValues(values);
          }}
          onBlur={handleBlur}
          inputProps={{
            id: "mobile",
            required: true,
            className:
              "input placeholder-heading focus-action-1 mb-30 w5 ml4 color-heading"
          }}
        />
      </div>
    </div>
  );
};
