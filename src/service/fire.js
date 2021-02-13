import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASURE,

  apiKey: "AIzaSyCBPpFDf-hl-jFikjFq-WV439n74JBnWeA",
  authDomain: "togo-9d17b.firebaseapp.com",
  databaseURL: "https://togo-9d17b-default-rtdb.firebaseio.com",
  projectId: "togo-9d17b",
  storageBucket: "togo-9d17b.appspot.com",
  messagingSenderId: "95500958643",
  appId: "1:95500958643:web:0b4d456c52baebb147a9c6",
  measurementId: "G-H72GT2QL69"
};
const fireInit = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default fireInit;