import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCFfgyfo7bCmBYSi_Ez3frIzOrNTgfC8v8",
  authDomain: "facebook-clone-c4bb7.firebaseapp.com",
  projectId: "facebook-clone-c4bb7",
  storageBucket: "facebook-clone-c4bb7.appspot.com",
  messagingSenderId: "702022123092",
  appId: "1:702022123092:web:f4deea369092a7bec677c1",
  measurementId: "G-Q4FS8YXFDP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storageRef = firebaseApp.storage();

export { auth, db, storageRef };
