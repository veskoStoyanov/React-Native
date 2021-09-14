import firebase from "firebase/app";

export const mapDocs = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const handleUserPosts = async (uid) => {
  const snapshot = await firebase
    .firestore()
    .collection("posts")
    .doc(uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get();

  return mapDocs(snapshot);
};
