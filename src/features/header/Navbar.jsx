import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";

export default ({ auth }) => (
  <nav className="pt-30 pb-30 bg-dark lh-40 text-center navigation_21">
    <div className="container px-xl-0">
      <div className="row justify-content-between align-items-center">
        <div
          className="col-lg-3 text-lg-left"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <Link
            to={`/dashboard/${auth && auth.uid}`}
            className="btn logo color-white"
          >
            Bunch
          </Link>
        </div>
        {/* <div className="col-lg-6" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
 
      <button className="btn  color-white">Features</button>
      <button className="btn  color-white">About</button>
      <button className="btn  color-white">F.A.Q.</button>
    </div> */}
        <div
          className="mt-10 mt-lg-0 col-lg-3 text-lg-right"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          {/* <button className="btn mx-10 sm border-transparent-white f-16">Sign In</button> */}
          <button
            type="button"
            className="btn ml-10 sm action-1 f-16"
            onClick={() => firebase.auth().signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </nav>
);
