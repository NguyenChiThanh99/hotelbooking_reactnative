/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';
import BadgeComponent from './BadgeComponent';

import backIcon from '../images/chevron-left-fff1dc.png';
import startIcon from '../images/start.png';
import endIcon from '../images/end.png';
import priceIcon from '../images/money.png';
import nightIcon from '../images/night.png';
import roomIcon from '../images/room.png';
import serviceIcon from '../images/service.png';

export default function BookingDetail({route, navigation}) {
  const {
    id,
    imageRoom,
    hotelName,
    roomName,
    soDem,
    soPhong,
    dichVu,
    giaPhong,
    ngayNhanPhong,
    ngayTraPhong,
  } = route.params.item;

  const convertToString = (dichvu) => {
    var buffet = dichvu.buffet ? 'Bữa sáng Bufet, ' : '';
    var spa = dichvu.spa ? 'Dịch vụ Spa, ' : '';
    var phonghop = dichvu.phonghop ? 'Dịch vụ phòng họp, ' : '';
    var giatui = dichvu.giatui ? 'Dịch vụ giặt ủi quần áo, ' : '';
    var xeduadon = dichvu.xeduadon ? 'Dịch vụ xe đưa đón, ' : '';
    var dvphong = dichvu.dvphong ? 'Dịch vụ phòng 24/24, ' : '';
    var doingoaite = dichvu.doingoaite ? 'Thu đổi ngoại tệ' : '';
    return buffet + spa + phonghop + giatui + xeduadon + dvphong + doingoaite;
  };

  var service = convertToString(dichVu).split(', ');

  const dichVuJSX = (
    <View>
      <View style={[styles.itemCont, {marginLeft: 5}]}>
        <Image style={styles.itemImg} source={serviceIcon} />
        <Text style={styles.dichVu}>Dịch vụ</Text>
      </View>
      <View style={styles.dvCont}>
        <View style={{paddingLeft: 20}}>
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
        <View style={{paddingLeft: 14}}>
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
      {/* Header */}
      <LinearGradient
        style={styles.headerContainer}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.titleCont}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Thông tin đặt phòng</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CART', {fromMain: false})}>
          <BadgeComponent />
        </TouchableOpacity>
      </LinearGradient>

      <Image style={styles.img} source={{uri: imageRoom}} />
      <View style={styles.body}>
        <Text style={styles.name}>{hotelName}</Text>
        <Text style={styles.room}>{roomName}</Text>

        <View style={[styles.itemCont, {marginLeft: 5, marginBottom: 1}]}>
          <Image style={styles.itemImg2} source={priceIcon} />
          <Text style={styles.itemText2}>
            {Global.currencyFormat((giaPhong * soDem * soPhong).toString())} đ
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={roomIcon} />
            <Text style={styles.itemText}>{soPhong} phòng</Text>
          </View>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={nightIcon} />
            <Text style={styles.itemText}>{soDem} đêm</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={startIcon} />
            <Text style={styles.itemText}>{ngayNhanPhong}</Text>
          </View>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={endIcon} />
            <Text style={styles.itemText}>{ngayTraPhong}</Text>
          </View>
        </View>

        {dichVuJSX}
      </View>

      <LinearGradient
        style={styles.btnCont}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Hủy đặt phòng</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const {width, backgroud_color, height, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: backgroud_color,
    height: height_header,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCont: {
    flexDirection: 'row',
    height: height_header,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff1dc',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  img: {
    width: width,
    height: height / 3.2,
  },
  name: {
    color: '#393939',
    fontSize: width / 20,
    fontWeight: 'bold',
    width: width / 1.2 - 20,
  },
  btnCont: {
    margin: 10,
    borderRadius: 10,
    height: height / 14,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: height / 14,
  },
  btnText: {
    fontSize: width / 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  body: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  room: {
    color: '#616167',
    paddingLeft: 5,
    fontSize: width / 26,
    marginBottom: 20,
  },
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2.2,
    marginVertical: 7,
  },
  itemImg: {
    width: width / 16,
    height: width / 16,
  },
  itemImg2: {
    width: width / 12,
    height: width / 12,
  },
  itemText: {
    color: '#999999',
    marginLeft: 10,
    fontSize: width / 25,
  },
  itemText2: {
    color: '#616167',
    marginLeft: 10,
    fontSize: width / 22,
    fontWeight: 'bold',
  },
  dichVu: {
    color: '#616167',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: width / 25,
  },
  dvCont: {
    flexDirection: 'row',
  },
  dvItem: {
    color: '#999999',
    fontSize: width / 28,
    width: width / 2.5,
    marginBottom: 2,
  },
});
