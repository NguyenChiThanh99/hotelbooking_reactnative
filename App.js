/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Global from './components/Global';
import Main from './components/Main';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import store from './store/store';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        style={{height: Global.height / 48}}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </LinearGradient>

      <Provider store={store}>
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
      </Provider>
    </View>
  );
}
