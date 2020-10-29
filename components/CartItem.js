/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

export default function CartItem(props) {
  const {
    id,
    image,
    hotelName,
    roomName,
    soDem,
    soPhong,
    dichVu,
    giaPhong,
    ngayNhanPhong,
    ngayTraPhong,
  } = props;
  var service = dichVu.split(', ');

  const dichVuJSX = (
    <View style={styles.infoCont}>
      <Text style={styles.dichVu}>Dịch vụ</Text>
      <View style={styles.dvCont}>
        <View>
          {service.map((element, index) => {
            if (index % 2 === 0) {
              return (
                <Text key={index.toString()} style={styles.dvItem}>
                  {element}
                </Text>
              );
            }
          })}
        </View>
        <View style={{marginLeft: width / 12}}>
          {service.map((element, index) => {
            if (index % 2 !== 0) {
              return (
                <Text key={index.toString()} style={styles.dvItem}>
                  {element}
                </Text>
              );
            }
          })}
        </View>
      </View>
    </View>
  );

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
            'rgba(0, 0, 0, 0.5)',
          ]}>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.nameHotel}>{hotelName}</Text>
            <Text style={styles.nameRoom}>{roomName}</Text>
          </View>
          <View>
            <Text style={styles.soPhong}>{soPhong} phòng</Text>
            <View style={styles.soDemCont}>
              <Text style={styles.soDem}>{soDem} đêm </Text>
              <Text style={styles.soDem2}>
                ({ngayNhanPhong} đến {ngayTraPhong})
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* {service[0] !== '' ? dichVuJSX : null} */}
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
    height: height / 3.8,
    justifyContent: 'space-between',
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
    textAlign: 'right',
  },
  nameRoom: {
    color: 'white',
    fontSize: width / 28,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  infoCont: {
    marginHorizontal: 10,
    borderBottomColor: '#DFDEDE',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  soDemCont: {
    flexDirection: 'row',
    color: 'white',
  },
  soDem: {
    color: 'white',
  },
  soDem2: {
    color: 'white',
  },
  soPhong: {
    color: 'white',
    marginBottom: 3,
  },
  dichVu: {
    color: '#616167',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  dvCont: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  dvItem: {
    color: '#616167',
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
