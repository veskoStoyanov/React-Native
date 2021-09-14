import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Components
import { AddScreen, SaveScreen } from './screens';
import MainScreen from './screens/Main';

import reducers from './redux/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const Stack = createStackNavigator();

import { LandingScreen, RegisterScreen, LoginScreen } from './screens';

const firebaseConfig = {
  apiKey: 'AIzaSyBtpP8GDCA-DobXb19sG82y9vS4REioKd4',
  authDomain: 'insta-app-2a01f.firebaseapp.com',
  projectId: 'insta-app-2a01f',
  storageBucket: 'insta-app-2a01f.appspot.com',
  messagingSenderId: '850960483092',
  appId: '1:850960483092:web:fde5c49643c8baefa93801',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const App = (props) => {
  const [isLoadind, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setIsLoading(false);
      } else {
        setLoggedIn(true);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoadind) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Provider store={store}>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen
              name='Main'
              component={MainScreen}
              options={{ headerShown: false }}
              navigation={props.navigation}
            />
            <Stack.Screen
              name='Add'
              component={AddScreen}
              navigation={props.navigation}
            />
            <Stack.Screen
              name='Save'
              component={SaveScreen}
              navigation={props.navigation}
            />
          </Stack.Navigator>
        </Provider>
      ) : (
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen
            name='Landing'
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
