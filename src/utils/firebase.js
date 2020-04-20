import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuzP6GxRvf9QRm_t6VLqPqurY9q0IPxMs",
  authDomain: "bunch-dev-631f9.firebaseapp.com",
  databaseURL: "https://bunch-dev-631f9.firebaseio.com",
  projectId: "bunch-dev-631f9",
  storageBucket: "bunch-dev-631f9.appspot.com",
  messagingSenderId: "603982863478",
  appId: "1:603982863478:web:ad9f2b565dfcb289945357",
  measurementId: "G-1HSLNSRBF8"
};

firebase.initializeApp(firebaseConfig);

firebase.performance();

export default firebase;
