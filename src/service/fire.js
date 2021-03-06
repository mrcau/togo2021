import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "samtool-2021.appspot.com",
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASURE,

  //togoserver
  // apiKey: "AIzaSyCBPpFDf-hl-jFikjFq-WV439n74JBnWeA",
  // authDomain: "togo-9d17b.firebaseapp.com",
  // databaseURL: "https://togo-9d17b-default-rtdb.firebaseio.com",
  // projectId: "togo-9d17b",
  // storageBucket: "togo-9d17b.appspot.com",
  // messagingSenderId: "95500958643",
  // appId: "1:95500958643:web:0b4d456c52baebb147a9c6",
  // measurementId: "G-H72GT2QL69"


};
const fireInit = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default fireInit;