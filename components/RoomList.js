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

import Global from './Global';
import BadgeComponent from './BadgeComponent';
import RoomItem from './RoomItem';
import Loading from './Loading';

import roomList from '../Api/roomList';

import backIcon from '../images/chevron-left-fff1dc.png';

export default function RoomList({navigation, route}) {
  const {tensp, id} = route.params;

  const [loading, setLoading] = useState(false);
  const [room_List, setRoom_List] = useState([]);

  useEffect(() => {
    loadHotel();
  }, []);

  const loadHotel = () => {
    setLoading(true);
    roomList
      .roomList(id)
      .then((responseJson) => {
        setRoom_List(responseJson);
        setLoading(false);
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
          <Text style={styles.headerText}>{tensp}</Text>
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
          contentContainerStyle={styles.listHotel}
          showsHorizontalScrollIndicator={false}
          data={room_List}
          renderItem={({item}) => (
            <RoomItem
              name={item.tenloaiphong}
              sogiuong={item.sogiuong}
              sokhach={item.sokhach}
              image={item.hinhanh}
              price={item.giaphong}
              id={item.id}
              idkhachsan={id}
              tenkhacksan={tensp}
              navigation={navigation}
            />
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
  cartIcon: {
    width: width / 15,
    resizeMode: 'contain',
  },
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  listHotel: {
    padding: 10,
  },
});
