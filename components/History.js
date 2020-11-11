/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import historyBooked from '../Api/historyBooked';

import Global from './Global';
import BadgeComponent from './BadgeComponent';
import HistoryItem from './HistoryItem';
import Loading from './Loading';

import backIcon from '../images/chevron-left-fff1dc.png';

export default function History({navigation, route}) {
  useEffect(() => {
    loadHotelBooked();
  }, []);

  const [hotel_Booked, setHotel_Booked] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHotelBooked = () => {
    setLoading(true);
    historyBooked
      .historyBooked(route.params.idUser)
      .then((responseJson) => {
        setHotel_Booked(responseJson);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
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
          <Text style={styles.headerText}>Thông tin đặt phòng</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CART', {fromMain: false})}>
          <BadgeComponent />
        </TouchableOpacity>
      </LinearGradient>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.listPlace}
          showsHorizontalScrollIndicator={false}
          data={hotel_Booked}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BOOKING_DETAIL', {item})}
              key={item}>
              <HistoryItem
                id={item.id}
                image={item.hinhanhsp}
                hotelName={item.tenkhachsan}
                roomName={item.tenphong}
                soDem={item.sodem}
                soPhong={item.soluongphong}
                giaPhong={item.giaphong}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
