import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

import firebase from "firebase/app";

import { mapDocs } from "../../utility";

const SearchScreen = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (search) => {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get();

    setUsers(mapDocs(snapshot));
  };

  return (
    <View>
      <TextInput onChangeText={fetchUsers} placeholder="Type Here..." />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile", { user: item })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;
