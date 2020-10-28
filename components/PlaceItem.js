/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

import hotelIcon from '../images/hotel-fff1dc.png';

export default function PlaceItem(props) {
  const {img, name, hotel} = props;
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{uri: img}}
        style={styles.background}
        imageStyle={{borderRadius: 20}}>
        <LinearGradient
          style={styles.background2}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0.6)',
          ]}>
          <View style={styles.hotelCont}>
            <Text style={styles.name}>{name}</Text>
            <LinearGradient
              style={styles.numHotel}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.hotel}>{hotel}</Text>
              <Image source={hotelIcon} style={styles.hotelIcon} />
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const {width, height} = Global;
const styles = StyleSheet.create({
  wrapper: {},
  background: {
    width: width - 20,
    height: height / 3.5,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  background2: {
    width: width - 20,
    height: height / 10,
    justifyContent: 'flex-end',
    padding: width / 40,
    borderRadius: 20,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width / 20,
  },
  hotelCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numHotel: {
    flexDirection: 'row',
    backgroundColor: '#F8A170',
    borderRadius: 10,
    width: width / 6.8,
    height: height / 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotel: {
    color: 'white',
    fontSize: width / 30,
    marginRight: 5,
  },
  hotelIcon: {
    width: width / 35,
    height: width / 28,
  },
});
