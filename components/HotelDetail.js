import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker} from 'react-native-maps';

import Global from './Global';
import BadgeComponent from './BadgeComponent';

import backIcon from '../images/chevron-left-fff1dc.png';
import marker from '../images/marker.png';
import star from '../images/star-fff1dc.png';
import descriptionIcon from '../images/description.png';
import ratingIcon from '../images/rating.png';

export default function HotelDetail({navigation, route}) {
  const {tensp, id, hinhanhsp, mota, diachi, coordinates} = route.params.hotel;
  const [desStatus, setDesStatus] = useState(false);

  const region = {
    latitude: parseFloat(coordinates.split(',')[0]),
    longitude: parseFloat(coordinates.split(',')[1]),
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

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
          <Text
            style={styles.headerText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {tensp}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CART', {fromMain: false})}>
          <BadgeComponent />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView>
        <Image style={styles.img} source={{uri: hinhanhsp}} />
        <View style={styles.nameCont}>
          <Text style={styles.name}>{tensp}</Text>
          <LinearGradient
            style={styles.rateingCont}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.rateingHotel}>{route.params.avgMark}</Text>
            <Image source={star} style={styles.starIcon} />
          </LinearGradient>
        </View>
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            image={marker}
          />
        </MapView>
        <View style={styles.infoItem}>
          <View style={styles.iconInfoCont}>
            <Image style={styles.iconInfo} source={marker} />
          </View>
          <Text style={styles.info}>{diachi}</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconInfoCont}>
            <Image style={styles.iconInfo2} source={descriptionIcon} />
          </View>
          <TouchableOpacity onPress={() => setDesStatus(!desStatus)}>
            <Text style={styles.info2}>Mô tả khách sạn</Text>
          </TouchableOpacity>
        </View>
        {desStatus ? (
          <TouchableOpacity onPress={() => setDesStatus(!desStatus)}>
            <Text style={styles.description}>{mota}</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.infoItem}>
          <View style={styles.iconInfoCont}>
            <Image style={styles.iconInfo2} source={ratingIcon} />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LIST_REVIEW', {
                name: tensp,
                id: id,
                avgMark: route.params.avgMark,
                navigation: navigation,
              })
            }>
            <Text style={styles.info2}>Đánh giá khách sạn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LinearGradient
        style={styles.btnCont}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('ROOM_LIST', {id: id, tensp: tensp})
          }>
          <Text style={styles.btnText}>Chọn phòng</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const {width, backgroud_color, height_header, height} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
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
    width: width / 1.3,
  },
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  map: {
    width: width,
    height: height / 3.6,
  },
  img: {
    width: width,
    height: height / 3.2,
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
  rateingHotel: {
    color: 'white',
    fontSize: width / 29,
    marginRight: 5,
  },
  starIcon: {
    width: width / 30,
    resizeMode: 'contain',
  },
  nameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height / 36,
    paddingHorizontal: 10,
  },
  name: {
    color: '#393939',
    fontSize: width / 18,
    fontWeight: 'bold',
    width: width / 1.2 - 20,
  },
  infoItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  iconInfoCont: {
    flexDirection: 'row',
    backgroundColor: '#fff4ed',
    width: width / 11,
    height: width / 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  iconInfo: {
    width: width / 15,
    resizeMode: 'contain',
  },
  iconInfo2: {
    width: width / 17,
    resizeMode: 'contain',
  },
  info: {
    color: '#999999',
    width: width - width / 11 - 30,
    marginLeft: 10,
  },
  info2: {
    color: '#FBB768',
    width: width - width / 10 - 30,
    marginLeft: 10,
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
  description: {
    marginLeft: width / 16,
    marginRight: 10,
    color: '#999999',
    textAlign: 'justify',
  },
});
