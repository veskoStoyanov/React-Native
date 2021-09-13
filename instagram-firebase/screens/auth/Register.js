import React, { useState } from "react";

import firebase from "firebase";

import { View, Button, TextInput } from "react-native";

const Register = ({ navigation }) => {
  const [ state, setState ] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOnPress = async () => {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(
        state.email,
        state.password
      );

      firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set({
        name: state.name,
        email: state.email
      })
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}
    >
      <TextInput
        placeholder="Name"
        value={state.name}
        onChangeText={(name) => setState((prev) => ({ ...prev, name }))}
      />
      <TextInput
        placeholder="Email"
        value={state.email}
        onChangeText={(email) => setState((prev) => ({ ...prev, email }))}
      />
      <TextInput
        placeholder="Password"
        value={state.password}
        secureTextEntry={true}
        onChangeText={(password) => setState((prev) => ({ ...prev, password }))}
      />

      <Button onPress={handleOnPress} title="Sign Up" />
    </View>
  );
};

export default Register;
