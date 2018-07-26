import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAHHbFa-AZHsqXq-VkyLN7QmkJ6AvvexX4",
  authDomain: "cmgen-a8ab6.firebaseapp.com",
  databaseURL: "https://cmgen-a8ab6.firebaseio.com",
  projectId: "cmgen-a8ab6",
  storageBucket: "cmgen-a8ab6.appspot.com",
  messagingSenderId: "1054605010758"
};

/* Initialize Firebase */
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* Constants */
const auth = firebase.auth();
const database = firebase.database();

const providerData = {
  google: new firebase.auth.GoogleAuthProvider()
};

export { auth, database, firebase, providerData };
