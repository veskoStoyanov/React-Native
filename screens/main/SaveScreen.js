import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/firebase-storage");

const SaveScreen = (props) => {
  const [caption, setCaption] = useState("");

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPost")
      .add({
        downloadURL,
        caption,
        likesCount: 0,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => props.navigation.popToTop());
  };

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption"
        onChangeText={(text) => setCaption(text)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};

export default SaveScreen;
