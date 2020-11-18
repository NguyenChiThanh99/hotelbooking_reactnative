import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import star from '../images/star-fff1dc.png';

import Global from './Global';

export default function RoomList(props) {
  const {
    image,
    hoten,
    content,
    mark,
    ngaynhanphong,
    ngaytraphong,
    tenphong,
    navigation,
    fromListReview,
  } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <Text style={styles.name}>{hoten}</Text>
        <Text style={styles.room}>{tenphong}</Text>
        <View style={styles.dateCont}>
          <Text style={styles.start}>{ngaynhanphong} - </Text>
          <Text style={styles.end}>{ngaytraphong}</Text>
        </View>

        <LinearGradient
          style={styles.rateingCont}
          colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.rateingHotel}>{mark}/10</Text>
          <Image source={star} style={styles.starIcon} />
        </LinearGradient>
      </View>

      <View>
        <Text style={styles.content}>{content}</Text>
        {fromListReview ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FULLIMAGE', {img: image});
            }}>
            <Image style={styles.image} source={{uri: image}} />
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={{uri: image}} />
        )}
      </View>
    </View>
  );
}

const {width, height} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
  },
  name: {
    color: '#393939',
    fontSize: width / 30,
    fontWeight: 'bold',
    width: width / 3,
    textAlign: 'center',
  },
  room: {
    color: '#999999',
    fontSize: width / 38,
    width: width / 4,
    textAlign: 'center',
  },
  dateCont: {
    flexDirection: 'row',
  },
  start: {
    color: '#999999',
    fontSize: width / 38,
  },
  end: {
    color: '#999999',
    fontSize: width / 38,
  },
  content: {
    marginVertical: 5,
    width: width / 1.8,
    textAlign: 'justify',
  },
  image: {
    width: width / 4,
    height: width / 5,
    borderRadius: 8,
  },
  rateingCont: {
    flexDirection: 'row',
    backgroundColor: '#F8A170',
    borderRadius: 10,
    width: width / 6.2,
    height: height / 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  rateingHotel: {
    color: 'white',
    fontSize: width / 32,
    marginRight: 5,
  },
  starIcon: {
    width: width / 32,
    resizeMode: 'contain',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#fff',
    borderRightColor: '#DFDEDE',
    borderWidth: 0.95,
    paddingRight: 10,
    marginRight: 10,
  },
});
