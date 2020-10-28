import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';
import HotelItemList from './HotelItemList';
import BadgeComponent from './BadgeComponent';

import backIcon from '../images/chevron-left-fff1dc.png';
import searchIcon from '../images/search.png';

export default function Search({route, navigation}) {
  const dataSample = [
    {
      id: 1,
      name: 'Saigon Sparkle Hotel',
      price: '2300000',
      image:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      description:
        'Saigon Sparkle Hotel tọa lạc ở trung tâm thành phố Hồ Chí Minh, cách Chợ Bến Thành chỉ 2 phút đi bộ. Khách sạn có nhà hàng, chỗ đỗ xe và Wi-Fi miễn phí. Các phòng lắp máy điều hòa tại đây đều được trang bị TV màn hình phẳng, tủ lạnh mini và két an toàn. Phòng cũng có máy sấy tóc và dép.',
      address: '229 Le Thanh Ton, Quận 1, TP. Hồ Chí Minh, Việt Nam',
      rating: 9.5,
    },
    {
      id: 2,
      name: 'Saigon Sparkle Hotel',
      price: '2300000',
      image:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      description:
        'Saigon Sparkle Hotel tọa lạc ở trung tâm thành phố Hồ Chí Minh, cách Chợ Bến Thành chỉ 2 phút đi bộ. Khách sạn có nhà hàng, chỗ đỗ xe và Wi-Fi miễn phí. Các phòng lắp máy điều hòa tại đây đều được trang bị TV màn hình phẳng, tủ lạnh mini và két an toàn. Phòng cũng có máy sấy tóc và dép.',
      address: '229 Le Thanh Ton, Quận 1, TP. Hồ Chí Minh, Việt Nam',
      rating: 9.5,
    },
    {
      id: 3,
      name: 'Saigon Sparkle Hotel',
      price: '2300000',
      image:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      description:
        'Saigon Sparkle Hotel tọa lạc ở trung tâm thành phố Hồ Chí Minh, cách Chợ Bến Thành chỉ 2 phút đi bộ. Khách sạn có nhà hàng, chỗ đỗ xe và Wi-Fi miễn phí. Các phòng lắp máy điều hòa tại đây đều được trang bị TV màn hình phẳng, tủ lạnh mini và két an toàn. Phòng cũng có máy sấy tóc và dép.',
      address: '229 Le Thanh Ton, Quận 1, TP. Hồ Chí Minh, Việt Nam',
      rating: 9.5,
    },
    {
      id: 4,
      name: 'Saigon Sparkle Hotel',
      price: '2300000',
      image:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      description:
        'Saigon Sparkle Hotel tọa lạc ở trung tâm thành phố Hồ Chí Minh, cách Chợ Bến Thành chỉ 2 phút đi bộ. Khách sạn có nhà hàng, chỗ đỗ xe và Wi-Fi miễn phí. Các phòng lắp máy điều hòa tại đây đều được trang bị TV màn hình phẳng, tủ lạnh mini và két an toàn. Phòng cũng có máy sấy tóc và dép.',
      address: '229 Le Thanh Ton, Quận 1, TP. Hồ Chí Minh, Việt Nam',
      rating: 9.5,
    },
    {
      id: 5,
      name: 'Saigon Sparkle Hotel',
      price: '2300000',
      image:
        'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/96/95/96959_v6.jpeg',
      description:
        'Saigon Sparkle Hotel tọa lạc ở trung tâm thành phố Hồ Chí Minh, cách Chợ Bến Thành chỉ 2 phút đi bộ. Khách sạn có nhà hàng, chỗ đỗ xe và Wi-Fi miễn phí. Các phòng lắp máy điều hòa tại đây đều được trang bị TV màn hình phẳng, tủ lạnh mini và két an toàn. Phòng cũng có máy sấy tóc và dép.',
      address: '229 Le Thanh Ton, Quận 1, TP. Hồ Chí Minh, Việt Nam',
      rating: 9.5,
    },
  ];
  const [search, setSearch] = useState(route.params.search.search);

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
                setSearch({search: text});
              }}
              value={search}
              onSubmitEditing={(event) => {
                if (search !== '') {
                }
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (search !== '') {
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

      <FlatList
        contentContainerStyle={styles.listHotel}
        showsHorizontalScrollIndicator={false}
        data={dataSample}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HOTEL_DETAIL', {hotel: item})}>
            <HotelItemList
              img={item.image}
              name={item.name}
              rating={item.rating}
              price={item.price}
              address={item.address}
              description={item.description}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
