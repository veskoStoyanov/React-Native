import firebase from "firebase/app";

import { handleUserPosts } from "../../utility";

import {
  USER_STATE_CHANGED,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from "../constants";

export const fetchUser = () => async (dispatch) => {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get();

  if (!snapshot.exists) {
    console.log("user does not exist!");
    return;
  }

  return dispatch({
    payload: snapshot.data(),
    type: USER_STATE_CHANGED,
  });
};

export const fetchUserPosts = () => async (dispatch) => {
  const payload = await handleUserPosts(firebase.auth().currentUser.uid);

  return dispatch({
    payload,
    type: USER_POSTS_STATE_CHANGE,
  });
};

export const fetchUserFollowers = () => (dispatch) => {
  console.log('yesssssssssssssss')
  firebase
    .firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .onSnapshot((snapshot) => {
      console.log('nooooooooooooooooooo')
      const payload = snapshot.docs.map((doc) => doc.id);
      console.log(payload)

      return dispatch({
        payload,
        type: USER_FOLLOWING_STATE_CHANGE,
      });
    });
};
