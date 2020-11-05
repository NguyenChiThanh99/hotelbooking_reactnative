/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

export default function HistoryItem(props) {
  const {image, hotelName, roomName, soDem, soPhong, giaPhong} = props;

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{uri: image}}
        style={styles.background}
        imageStyle={styles.backgroundRadius}>
        <LinearGradient
          style={styles.background2}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0.7)',
          ]}>
          <Text style={styles.nameHotel}>{hotelName}</Text>
          <Text style={styles.nameRoom}>{roomName}</Text>
        </LinearGradient>
      </ImageBackground>

      <Text style={styles.price}>
        {Global.currencyFormat((giaPhong * soPhong * soDem).toString())} đ
      </Text>
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
    elevation: 1,
  },
  background: {
    width: width - 20,
    height: height / 3.8,
    justifyContent: 'flex-end',
  },
  background2: {
    width: width - 20,
    height: height / 7.5,
    justifyContent: 'flex-end',
    padding: width / 40,
    paddingBottom: width / 30,
  },
  backgroundRadius: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  nameHotel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width / 20,
  },
  nameRoom: {
    color: 'white',
    fontSize: width / 28,
  },
  price: {
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    color: '#393939',
    fontWeight: 'bold',
    fontSize: width / 20,
    alignSelf: 'flex-end',
  },
});
