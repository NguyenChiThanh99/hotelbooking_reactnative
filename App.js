import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootSiblingParent} from 'react-native-root-siblings';

import Main from './components/Main';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

StatusBar.setHidden(true);
const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootSiblingParent>
        <RootStack.Navigator initialRouteName="MAIN">
          <RootStack.Screen
            name="MAIN"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={Main}
          />
          <RootStack.Screen
            name="SIGNIN"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={SignIn}
          />
          <RootStack.Screen
            name="SIGNUP"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={SignUp}
          />
        </RootStack.Navigator>
      </RootSiblingParent>
    </NavigationContainer>
  );
}
