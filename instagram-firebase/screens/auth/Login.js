import React, { useState } from "react";

import firebase from "firebase";

import { View, Button, TextInput } from "react-native";

const Login = ({ navigation }) => {
  const [ state, setState ] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOnPress = async () => {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(
        state.email,
        state.password
      );

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

      <Button onPress={handleOnPress} title="Sign In" />
    </View>
  );
};

export default Login;
