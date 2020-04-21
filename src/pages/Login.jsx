import React from "react";
import { useImmerReducer } from "use-immer";
import { Redirect } from "react-router-dom";
import { useToasts } from "@zeit-ui/react";
import PhoneInput from "react-phone-input-2";
import firebase from "../utils/firebase";
import "react-phone-input-2/lib/style.css";
// Photo by Markus Spiske on Unsplash
// https://unsplash.com/photos/ezYZfFnzARM

const initialState = { name: "", mobile: "" };

function reducer(draft, action) {
  switch (action.type) {
    case "setName":
      draft.name = action.value;
      return draft;
    case "setMobile":
      draft.mobile = action.value;
      return draft;
    case "reset":
      return initialState;
    default:
      return draft;
  }
}

export default ({auth}) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  // const history = useHistory();
  const [, setToast] = useToasts();

  const writeUserToDatabase = ({ name, mobile }, uid) =>
    firebase
      .firestore()
      .doc(`users/${uid}`)
      .set({ name, mobile, uid }, { merge: true })
      .catch(console.error);

  const handleSubmit = () => {
    if (!state.name || !state.mobile) {
      setToast({
        text: "You must enter a valid name and mobile number.",
        type: "warning"
      });
      return;
    }

    new firebase.auth.PhoneAuthProvider()
      .verifyPhoneNumber(`+${state.mobile}`, window.recaptchaVerifier)
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
      .then(({ user }) => writeUserToDatabase(state, user.uid))
      .catch(error => {
        // tk, write a more human readable message for each kind of error
        dispatch({ type: "reset" });
        setToast({
          text: `${error.code} ${error.message}`,
          type: "warning"
        });
        setTimeout(() => window.location.reload(), 2000);
      });
  };

  if (auth) {
    return <Redirect to={`/dashboard/${auth.uid}`} />;
  }

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
                <div className="pt4 text-center">
                  <button
                    type="button"
                    className="f3 relative semibold text-uppercase sp-20 color-heading lh-68"
                  >
                    Sign up / Login
                  </button>
                </div>
                <div className="mt-50 pb-80 slider">
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <div className="row justify-content-center no-gutters">
                        <div className="col-xl-9 col-sm-10">
                          <div className="px-15">
                            <input
                              type="text"
                              placeholder="Your Name"
                              className="input mb-30 w-full border-gray focus-action-1 color-heading placeholder-heading text-center text-md-left"
                              required
                              onChange={e =>
                                dispatch({
                                  type: "setName",
                                  value: e.target.value
                                })
                              }
                            />
                            <PhoneInput
                              country="in"
                              value={state.mobile}
                              countryCodeEditable
                              autoFormat
                              onChange={phone =>
                                dispatch({
                                  type: "setMobile",
                                  value: phone
                                })}
                              buttonClass=" mt2 h2"
                              containerClass="input border-gray "
                              inputProps={{
                                required: true,
                                className:
                                  "input placeholder-heading focus-action-1 mb-30 w5 ml4 color-heading"
                              }}
                            />

                            <button
                              id="recaptcha"
                              type="submit"
                              className="btn mt-10 w-full action-1"
                            >
                              Join
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
