import firebase from 'firebase/app';

import { 
    USER_STATE_CHANGED,
 } from '../constants';

export const fetchUser = () => async (dispatch) => {
    const snapshot = await firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()

    if (!snapshot.exists) {
        console.log('user does not exist!');
        return;
    }

    return dispatch({
        payload: snapshot.data(),
        type: USER_STATE_CHANGED
    }); 
};