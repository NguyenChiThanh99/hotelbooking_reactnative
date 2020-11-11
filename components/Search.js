/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';

import Global from './Global';
import HotelItemList from './HotelItemList';
import BadgeComponent from './BadgeComponent';
import Loading from './Loading';

import search from '../Api/search';

import backIcon from '../images/chevron-left-fff1dc.png';
import searchIcon from '../images/search.png';

export default function Search({route, navigation}) {
  const [keyword, setKeyword] = useState(route.params.search.search);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const rating = useSelector((state) => state.rating);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = () => {
    setLoading(true);
    search
      .search(keyword)
      .then((responseJson) => {
        setResult(responseJson);
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

  const checkAvgMark = (id) => {
    for (let i = 0; i < rating.length; i++) {
      if (rating[i].idkhachsan === id) {
        return rating[i].avg;
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
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Tìm khách sạn"
              placeholderTextColor="#bababa"
              autoCapitalize="none"
              underlineColorAndroid="#ffffff"
              onChangeText={(text) => {
                setKeyword(text);
              }}
              value={keyword}
              onSubmitEditing={(event) => {
                if (keyword !== '') {
                  loadResult();
                }
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (keyword !== '') {
                  loadResult();
                }
              }}>
              <Image style={styles.searchIcon} source={searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CART', {fromMain: false})}>
          <BadgeComponent />
        </TouchableOpacity>
      </LinearGradient>

      {loading || result.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.listHotel}
          showsHorizontalScrollIndicator={false}
          data={result}
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
  searchIcon: {
    height: height / 34,
    width: height / 34,
  },
  textInputStyle: {
    fontSize: width / 26,
    width: width / 1.3 - height / 34 - 36,
    marginLeft: 10,
    paddingVertical: 5,
    color: '#393939',
  },
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: width / 1.3,
    height: height_header - 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 26,
    paddingLeft: 10,
  },
});
