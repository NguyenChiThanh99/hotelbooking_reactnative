/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  BackHandler,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useSelector, useDispatch} from 'react-redux';

import HotelItemHome from './HotelItemHome';
import Loading from './Loading';
import Global from './Global';
import {updateHotel} from '../actions';

import hotelLastest from '../Api/hotelLastest';
import hotelBooked from '../Api/hotelBooked';

import logo from '../images/Logo.png';
import searchIcon from '../images/search.png';
var countExit = 0;

export default function Home({navigation, route}) {
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

  const [search, setSearch] = useState('');
  const [Loading1, setLoading1] = useState(false);
  const [Loading2, setLoading2] = useState(false);
  const [hotel_Lastest, setHotel_Lastest] = useState([]);
  const [hotel_Booked, setHotel_Booked] = useState([]);
  const [avgMark, setAvgMark] = useState([]);

  const images = [
    'https://2.bp.blogspot.com/-N16KsEGiApQ/VoE7KUbjmTI/AAAAAAAAACQ/aRP23lgxFMU/s1600/6hourly%2Bbanner.jpg',
    'https://cdn1.ivivu.com/iVivu/2019/10/09/14/d-the-anam-1140x250.png',
    'https://cdn1.ivivu.com/iVivu/2019/08/02/14/d-intercon-phu-quoc-1140x250.png',
    'https://cdn1.ivivu.com/iVivu/2019/09/19/11/d-de-la-sapa-1140x250.png',
  ];

  useEffect(() => {
    setLoading1(true);
    loadHotelLastest();
    setLoading2(true);
    loadHotelBooked();
  }, []);

  const loadHotelLastest = () => {
    hotelLastest
      .hotelLastest()
      .then((responseJson) => {
        setHotel_Lastest(responseJson.hotelLastest);
        setAvgMark(responseJson.avgMark);
        setLoading1(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading1(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2000,
        });
      });
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const hotel = useSelector((state) => state.hotel);

  const loadHotelBooked = () => {
    hotelBooked
      .hotelBooked(user.id)
      .then((responseJson) => {
        setHotel_Booked(responseJson);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading2(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  var newData = [];
  for (let index = 0; index < hotel_Lastest.length - 1; index = index + 2) {
    var item1 = {...hotel_Lastest[index]};
    var item2 = {...hotel_Lastest[index + 1]};
    newData = newData.concat({item1, item2});
  }

  const checkAvgMark = (id) => {
    for (let i = 0; i < avgMark.length; i++) {
      if (avgMark[i].idkhachsan === id) {
        return avgMark[i].avg;
      }
    }
    return '__';
  };

  if (hotel) {
    dispatch(updateHotel(false));
    loadHotelBooked();
  }

  const HCM = [
    'hồ chí minh',
    'hồchíminh',
    'ho chi minh',
    'hochiminh',
    'ho chiminh',
    'hochi minh',
    'hồ chíminh',
    'hồchí minh',
  ];
  const HN = ['hà nội', 'hànội', 'ha noi', 'hanoi'];
  const DN = ['đà nẵng', 'đànẵng', 'da nang', 'danang'];
  const doSearch = () => {
    setSearch('');
    var input = {...search}.search.toLowerCase();
    if (HCM.indexOf(input) !== -1) {
      navigation.navigate('HOTEL_LIST', {
        place: 'TP. Hồ Chí Minh',
        id: 0,
      });
    } else if (HN.indexOf(input) !== -1) {
      navigation.navigate('HOTEL_LIST', {
        place: 'TP. Hà Nội',
        id: 1,
      });
    } else if (DN.indexOf(input) !== -1) {
      navigation.navigate('HOTEL_LIST', {
        place: 'TP. Đà Nẵng',
        id: 2,
      });
    } else {
      navigation.navigate('SEARCH', {search: search});
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <LinearGradient
        style={styles.headerContainer}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Image style={styles.logoIcon} source={logo} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Tìm khách sạn"
            placeholderTextColor="#bababa"
            autoCapitalize="none"
            underlineColorAndroid="#ffffff"
            onChangeText={(text) => {
              setSearch({search: text});
            }}
            value={search}
            onSubmitEditing={(event) => {
              if (search !== '') {
                doSearch();
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (search !== '') {
                doSearch();
              }
            }}>
            <Image style={styles.searchIcon} source={searchIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView>
        <SliderBox
          images={images}
          sliderBoxHeight={Global.height / 6.4}
          dotColor="#F8A170"
          inactiveDotColor="#DFDEDE"
          autoplay
          circleLoop
          imageLoadingColor="rgba(0, 0, 0, 0)"
        />

        <View style={styles.listCont}>
          <Text style={styles.headerList}>Mới nhất</Text>
          {Loading1 ? (
            <Loading />
          ) : (
            <FlatList
              contentContainerStyle={styles.listHotel}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={newData}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    style={{marginBottom: 10}}
                    onPress={() =>
                      navigation.navigate('HOTEL_DETAIL', {
                        hotel: item.item1,
                        avgMark: checkAvgMark(item.item1.id),
                      })
                    }>
                    <HotelItemHome
                      img={{uri: item.item1.hinhanhsp}}
                      name={item.item1.tensp}
                      place={item.item1.diachi}
                      price={item.item1.giasp}
                      rating={checkAvgMark(item.item1.id)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('HOTEL_DETAIL', {
                        hotel: item.item2,
                        avgMark: checkAvgMark(item.item2.id),
                      })
                    }>
                    <HotelItemHome
                      img={{uri: item.item2.hinhanhsp}}
                      name={item.item2.tensp}
                      place={item.item2.diachi}
                      price={item.item2.giasp}
                      rating={checkAvgMark(item.item2.id)}
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.item1.id.toString()}
            />
          )}
        </View>

        {hotel_Booked.length === 0 ? null : (
          <View style={styles.listCont}>
            <Text style={styles.headerList}>Đã đặt</Text>
            {Loading2 ? (
              <Loading />
            ) : (
              <FlatList
                contentContainerStyle={styles.listHotel}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={hotel_Booked}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('HOTEL_DETAIL', {
                        hotel: item,
                        avgMark: checkAvgMark(item.id),
                      })
                    }
                    key={item.id}>
                    <HotelItemHome
                      img={{uri: item.hinhanhsp}}
                      name={item.tensp}
                      place={item.diachi}
                      price={item.giasp}
                      rating={checkAvgMark(item.id)}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const {width, height, backgroud_color, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#e5e5e5',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: backgroud_color,
    height: height_header,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  searchIcon: {
    height: height / 34,
    width: height / 34,
  },
  logoIcon: {
    height: height / 18,
    width: height / 18,
    borderRadius: height / 36,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  textInputStyle: {
    fontSize: width / 26,
    width: width / 1.3 - height / 34 - 36,
    marginLeft: 10,
    paddingVertical: 5,
    color: '#393939',
  },
  listHotel: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  headerList: {
    color: '#393939',
    fontSize: width / 25,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 10,
  },
  listCont: {
    backgroundColor: '#fafafb',
    marginBottom: 10,
  },
});
