import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { userActions } from "../redux/actions";

// Components
import { FeedScreen, ProfileScreen } from "./";

const EmptyScreen = () => null;

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const { fetchUser } = bindActionCreators(userActions, dispatch);

  const currentUser = useSelector((state) => state.userState.currentUser);
  console.log(currentUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddScreen"
        listeners={({ navigation }) => ({
            tabPress: (event) => {
                event.preventDefault();
                navigation.navigate('Add');
            }
        })}
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
