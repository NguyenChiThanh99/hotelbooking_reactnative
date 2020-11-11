import React from 'react';
import {StyleSheet, Image, Dimensions, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Badge} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import home from '../images/home.png';
import home_s from '../images/home-s.png';
import cart from '../images/cart.png';
import cart_s from '../images/cart-s.png';
import map from '../images/map.png';
import map_s from '../images/map-s.png';
import user from '../images/user.png';
import user_s from '../images/user-s.png';

import Home from './Home';
import Place from './Place';
import Cart from './Cart';
import Account from './Account';
import HotelDetail from './HotelDetail';
import HotelList from './ListHotel.js';
import RoomList from './RoomList';
import PersonalInformation from './PersonalInformation';
import Payment from './Payment';
import History from './History';
import BookingDetail from './BookingDetail';
import Search from './Search';
import Review from './Review';
import {updateCart} from '../actions';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function Tabs({navigation}) {
  const cartLength = useSelector((state) => state.cart.length);
  return (
    <Tab.Navigator
      initialRouteName={'Trang chủ'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Trang chủ') {
            return focused ? (
              <Image style={styles.iconTabbar} source={home_s} />
            ) : (
              <Image style={styles.iconTabbar} source={home} />
            );
          } else if (route.name === 'Địa điểm') {
            return focused ? (
              <Image style={styles.iconTabbar} source={map_s} />
            ) : (
              <Image style={styles.iconTabbar} source={map} />
            );
          } else if (route.name === 'Giỏ hàng') {
            return focused ? (
              <View>
                <Image style={styles.iconTabbar} source={cart_s} />
                <Badge
                  value={cartLength}
                  containerStyle={styles.containerStyle}
                  badgeStyle={styles.badgeStyle}
                />
              </View>
            ) : (
              <View>
                <Image style={styles.iconTabbar} source={cart} />
                <Badge
                  value={cartLength}
                  containerStyle={styles.containerStyle}
                  badgeStyle={styles.badgeStyle2}
                />
              </View>
            );
          } else if (route.name === 'Tài khoản') {
            return focused ? (
              <Image style={styles.iconTabbar} source={user_s} />
            ) : (
              <Image style={styles.iconTabbar} source={user} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#F8A170',
        inactiveTintColor: '#DFDEDE',
      }}>
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Địa điểm" component={Place} />
      <Tab.Screen
        name="Giỏ hàng"
        children={() => <Cart fromMain={true} navigation={navigation} />}
      />
      <Tab.Screen name="Tài khoản" component={Account} />
    </Tab.Navigator>
  );
}

var flag = false;
var preUser = 0;

export default function Main({route}) {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user);
  const getData = async () => {
    var key = '@cart' + '_' + userid.id.toString();
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      dispatch(updateCart(jsonValue !== null ? JSON.parse(jsonValue) : []));
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  if (preUser !== userid.id) {
    flag = false;
  }
  if (flag === false && userid !== null) {
    getData();
    flag = true;
    preUser = userid.id;
  }

  return (
    <MainStack.Navigator initialRouteName="TABS">
      <MainStack.Screen
        name="TABS"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Tabs}
      />
      <MainStack.Screen
        name="HOTEL_DETAIL"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={HotelDetail}
      />
      <MainStack.Screen
        name="HOTEL_LIST"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={HotelList}
      />
      <MainStack.Screen
        name="CART"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Cart}
      />
      <MainStack.Screen
        name="ROOM_LIST"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={RoomList}
      />
      <MainStack.Screen
        name="PERSONAL_INFORMATION"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={PersonalInformation}
      />
      <MainStack.Screen
        name="PAYMENT"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Payment}
      />
      <MainStack.Screen
        name="HISTORY"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={History}
      />
      <MainStack.Screen
        name="BOOKING_DETAIL"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={BookingDetail}
      />
      <MainStack.Screen
        name="SEARCH"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Search}
      />
      <MainStack.Screen
        name="REVIEW"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Review}
      />
    </MainStack.Navigator>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  iconTabbar: {
    width: width / 15,
    resizeMode: 'contain',
  },
  containerStyle: {
    position: 'absolute',
    top: height / 3.05,
    right: -10,
  },
  badgeStyle: {
    backgroundColor: '#FFCD61',
    borderWidth: 1,
  },
  badgeStyle2: {
    backgroundColor: '#DFDEDE',
    borderWidth: 1,
  },
});
