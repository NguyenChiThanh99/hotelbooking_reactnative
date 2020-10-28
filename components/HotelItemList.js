/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

import star from '../images/star-fff1dc.png';

export default function HotelItemHome(props) {
  const {img, name, address, price, rating, description} = props;
  var position = address.lastIndexOf(', Việt Nam');

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{uri: img}}
        style={styles.background}
        imageStyle={styles.backgroundRadius}>
        <LinearGradient
          style={styles.background2}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0.7)',
          ]}>
          <View style={styles.hotelCont}>
            <Text style={styles.name}>{name}</Text>
            <LinearGradient
              style={styles.rateingCont}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.rateingHotel}>{rating}</Text>
              <Image source={star} style={styles.starIcon} />
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={{padding: 15}}>
        <Text style={styles.address}>{address.slice(0, position)}</Text>
        <View style={styles.desCont}>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {description}
          </Text>
          <Text style={styles.price}>{Global.currencyFormat(price)} đ</Text>
        </View>
      </View>
    </View>
  );
}

const {width, height} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: width - 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  background: {
    width: width - 20,
    height: height / 3.4,
    justifyContent: 'flex-end',
  },
  background2: {
    width: width - 20,
    height: height / 8,
    justifyContent: 'flex-end',
    padding: width / 40,
    paddingBottom: width / 30,
  },
  backgroundRadius: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  hotelCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateingCont: {
    flexDirection: 'row',
    backgroundColor: '#F8A170',
    borderRadius: 10,
    width: width / 6.8,
    height: height / 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width / 20,
    width: width / 1.4,
  },
  rateingHotel: {
    color: 'white',
    fontSize: width / 29,
    marginRight: 5,
  },
  starIcon: {
    width: width / 30,
    resizeMode: 'contain',
  },
  address: {
    color: '#999999',
  },
  desCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  description: {
    color: '#393939',
    width: width / 1.8,
  },
  price: {
    color: '#434343',
    fontWeight: 'bold',
    fontSize: width / 20,
  },
});
