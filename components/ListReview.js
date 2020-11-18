/* eslint-disable react-native/no-inline-styles */
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
import Loading from './Loading';
import RatingItem from './RatingItem';

import listRating from '../Api/listRating';

import backIcon from '../images/chevron-left-fff1dc.png';

export default function ListReview({navigation, route}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {avgMark, id, name} = route.params;

  useEffect(() => {
    avgMark !== '__' ? loadRatingList() : null;
  }, []);

  const loadRatingList = () => {
    setLoading(true);
    listRating
      .listRating(id)
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
  const ItemSeparator = () => {
    return <View style={styles.separator} />;
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
            {name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CART', {fromMain: false})}>
          <BadgeComponent />
        </TouchableOpacity>
      </LinearGradient>

      {avgMark === '__' ? (
        <Text
          style={{
            flex: 1,
            alignSelf: 'center',
            marginTop: height / 2.5,
            color: '#999',
          }}>
          Khách sạn chưa có đánh giá nào
        </Text>
      ) : loading ? (
        <Loading />
      ) : (
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => (
            <View>
              <RatingItem
                hoten={item.hoten}
                image={item.image}
                content={item.content}
                mark={item.mark}
                ngaynhanphong={item.ngaynhanphong}
                ngaytraphong={item.ngaytraphong}
                tenphong={item.tenphong}
                navigation={navigation}
                fromListReview={true}
              />
            </View>
          )}
          keyExtractor={(item) => item.image}
        />
      )}
    </View>
  );
}

const {width, backgroud_color, height, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
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
  separator: {
    borderColor: '#fff',
    borderBottomColor: '#DFDEDE',
    borderWidth: 0.95,
    marginHorizontal: 10,
  },
});
