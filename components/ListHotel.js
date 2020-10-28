/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import hotel from '../Api/hotel';

import Global from './Global';
import HotelItemList from './HotelItemList';
import BadgeComponent from './BadgeComponent';
import Loading from './Loading';

import backIcon from '../images/chevron-left-fff1dc.png';

export default function HotelList({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [hotel_List, setHotel_List] = useState([]);
  const [avgMark, setAvgMark] = useState([]);
  const [page, setPage] = useState(1);
  const [endOfArray, setEndOfArray] = useState(false);

  useEffect(() => {
    loadHotel();
  }, []);

  const loadHotel = () => {
    setLoading(true);
    hotel
      .hotel(page, route.params.id + 1)
      .then((responseJson) => {
        if (responseJson.hotellist.length !== 0) {
          setHotel_List(hotel_List.concat(responseJson.hotellist));
          if (page === 1) {
            setAvgMark(responseJson.avgMark);
          }
          setLoading(false);
          setPage(page + 1);
        } else {
          setLoading(false);
          setEndOfArray(true);
          Toast.show('Đã đến cuối danh sách', {
            position: -20,
            duration: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2000,
        });
      });
  };

  const checkAvgMark = (id) => {
    for (let i = 0; i < avgMark.length; i++) {
      if (avgMark[i].idkhachsan === id) {
        return avgMark[i].avg;
      }
    }
    return '__';
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
          <Text style={styles.headerText}>{route.params.place}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CART', {fromMain: false})}>
          <BadgeComponent />
        </TouchableOpacity>
      </LinearGradient>

      {page === 1 && loading ? (
        <Loading />
      ) : (
        <FlatList
          onEndReachedThreshold={0.3}
          onEndReached={endOfArray ? null : loadHotel}
          ListFooterComponent={page !== 1 && loading ? <Loading /> : null}
          contentContainerStyle={styles.listHotel}
          showsHorizontalScrollIndicator={false}
          data={hotel_List}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HOTEL_DETAIL', {
                  hotel: item,
                  avgMark: checkAvgMark(item.id),
                })
              }>
              <HotelItemList
                img={item.hinhanhsp}
                name={item.tensp}
                rating={checkAvgMark(item.id)}
                price={item.giasp}
                address={item.diachi}
                description={item.mota}
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
  cartIcon: {
    width: width / 15,
    resizeMode: 'contain',
  },
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 5,
  },
  listHotel: {
    padding: 10,
  },
});
