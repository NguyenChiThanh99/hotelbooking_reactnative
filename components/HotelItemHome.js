/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

import star from '../images/star-ffffff.png';

export default function HotelItemHome(props) {
  const {img, name, place, price, rating} = props;
  var shortPlace = place.split(', ');
  var lengthShortPlace = shortPlace.length;
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={img}
        style={styles.background}
        imageStyle={{borderRadius: 20}}>
        <LinearGradient
          style={styles.background2}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0.6)',
          ]}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <Text style={styles.place} numberOfLines={1} ellipsizeMode="tail">
            {shortPlace[lengthShortPlace - 3] +
              ', ' +
              shortPlace[lengthShortPlace - 2]}
          </Text>
          <View style={styles.infoCont}>
            <View style={styles.priceCont}>
              <Text style={styles.rating}>{rating}</Text>
              <Image source={star} style={styles.star} />
            </View>
            <Text style={styles.price}>{Global.currencyFormat(price)} đ</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const {width, height} = Global;
const styles = StyleSheet.create({
  wrapper: {
    paddingRight: 10,
  },
  background: {
    width: width / 1.8,
    height: height / 4.5,
    justifyContent: 'flex-end',
  },
  background2: {
    width: width / 1.8,
    height: height / 7,
    justifyContent: 'flex-end',
    padding: width / 40,
    borderRadius: 20,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width / 25,
  },
  place: {
    color: 'white',
    fontSize: width / 35,
    marginTop: 5,
  },
  priceCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: 'white',
    fontSize: width / 35,
  },
  rating: {
    color: 'white',
    fontSize: width / 35,
    marginRight: 3,
  },
  infoCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star: {
    width: width / 36,
    height: width / 36,
  },
});
