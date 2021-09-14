import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase/app';

import { userActions } from '../redux/actions';

// Components
import { FeedScreen, ProfileScreen, SearchScreen } from './';

const EmptyScreen = () => null;

const Tab = createMaterialBottomTabNavigator();

const Main = (props) => {
  const dispatch = useDispatch();
  const { fetchUser, fetchUserPosts } = bindActionCreators(
    userActions,
    dispatch
  );

  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  return (
    <Tab.Navigator initialRouteName='Feed' labeled={false}>
      <Tab.Screen
        name='Feed'
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={26} />
          ),
        }}
        navigation={props.navigation}
      />
      <Tab.Screen
        name='AddScreen'
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Add');
          },
        })}
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='plus-box' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Profile', {
              user: { uid: firebase.auth().currentUser.uid },
            });
          },
        })}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account-circle'
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
