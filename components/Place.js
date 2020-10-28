import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import Global from './Global';
import PlaceItem from './PlaceItem';
import Loading from './Loading';

import placeList from '../Api/placeList';
var countExit = 0;

export default function Place({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (countExit === 0) {
          countExit += 1;
          Toast.show('Chạm lần nữa để thoát', {
            position: 0,
            duration: 2000,
          });
        } else {
          BackHandler.exitApp();
        }

        const timer = setTimeout(() => {
          countExit = 0;
        }, 2000);
        return () => clearTimeout(timer);
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadPlaceList();
  }, []);

  const loadPlaceList = () => {
    placeList
      .placeList()
      .then((responseJson) => {
        setData(responseJson);
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
        <Text style={styles.headerText}>Địa điểm</Text>
      </LinearGradient>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.listPlace}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HOTEL_LIST', {
                  place: item.tenloaisp,
                  id: index,
                })
              }
              key={item}>
              <PlaceItem
                img={item.hinhanhloaisp}
                name={item.tenloaisp}
                hotel={item.numHotel}
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
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  listPlace: {
    padding: 10,
  },
  headerContainer: {
    backgroundColor: backgroud_color,
    height: height_header,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: '#fff1dc',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
});
