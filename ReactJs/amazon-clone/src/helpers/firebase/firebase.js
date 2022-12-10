import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBLwbvrr9TjwdqUlQqpFp08c27-vVUA6PY",
	authDomain: "clone-54f12.firebaseapp.com",
	projectId: "clone-54f12",
	storageBucket: "clone-54f12.appspot.com",
	messagingSenderId: "642922569313",
	appId: "1:642922569313:web:7e4e0e4c7eec94cf311420",
	measurementId: "G-SCBNGQZVKJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
