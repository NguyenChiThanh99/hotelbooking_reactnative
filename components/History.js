import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';
import BadgeComponent from './BadgeComponent';
import HistoryItem from './HistoryItem';

import backIcon from '../images/chevron-left-fff1dc.png';

export default function History({navigation}) {
  const dataSample = [
    {
      id: 1,
      imageRoom:
        'https://q-cf.bstatic.com/xdata/images/hotel/max1024x768/140719216.jpg?k=54e2a279cf6a6cac89505439fcbb37631209ac775e7153ddbc1e5a14e45e3bb1&o=',
      imageHotel:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      hotelName: 'Saigon Sparkle Hotel',
      roomName: 'Phòng giường đôi',
      soDem: 3,
      soPhong: 1,
      dichVu: {
        buffet: true,
        spa: false,
        phonghop: true,
        giatui: false,
        xeduadon: true,
        dvphong: false,
        doingoaite: true,
      },
      giaPhong: '653016',
      ngayNhanPhong: '10/21/2020',
      ngayTraPhong: '10/23/2020',
    },
    {
      id: 2,
      imageRoom:
        'https://q-cf.bstatic.com/xdata/images/hotel/max1024x768/140719216.jpg?k=54e2a279cf6a6cac89505439fcbb37631209ac775e7153ddbc1e5a14e45e3bb1&o=',
      imageHotel:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      hotelName: 'Saigon Sparkle Hotel',
      roomName: 'Phòng giường đôi',
      soDem: 3,
      soPhong: 1,
      dichVu: {
        buffet: false,
        spa: true,
        phonghop: true,
        giatui: true,
        xeduadon: true,
        dvphong: false,
        doingoaite: true,
      },
      giaPhong: '653016',
      ngayNhanPhong: '10/21/2020',
      ngayTraPhong: '10/24/2020',
    },
    {
      id: 3,
      imageRoom:
        'https://q-cf.bstatic.com/xdata/images/hotel/max1024x768/140719216.jpg?k=54e2a279cf6a6cac89505439fcbb37631209ac775e7153ddbc1e5a14e45e3bb1&o=',
      imageHotel:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      hotelName: 'Saigon Sparkle Hotel',
      roomName: 'Phòng giường đôi',
      soDem: 3,
      soPhong: 1,
      dichVu: {
        buffet: true,
        spa: false,
        phonghop: true,
        giatui: false,
        xeduadon: false,
        dvphong: false,
        doingoaite: true,
      },
      giaPhong: '653016',
      ngayNhanPhong: '10/21/2020',
      ngayTraPhong: '10/25/2020',
    },
  ];

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

      <FlatList
        contentContainerStyle={styles.listPlace}
        showsHorizontalScrollIndicator={false}
        data={dataSample}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('BOOKING_DETAIL', {item})}
            key={item}>
            <HistoryItem
              id={item.id}
              image={item.imageHotel}
              hotelName={item.hotelName}
              roomName={item.roomName}
              soDem={item.soDem}
              soPhong={item.soPhong}
              giaPhong={item.giaPhong}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const {width, backgroud_color, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#e5e5e5',
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
  listPlace: {
    padding: 10,
    paddingBottom: 0,
  },
});
