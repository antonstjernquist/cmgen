import { auth, providerData } from "./firebase.js";

export const doLogInWithGoogle = () => {
  return auth.signInWithPopup(providerData.google);
};

export const doSignOut = () => {
  auth.signOut();
};
