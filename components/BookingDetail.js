/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import Global from './Global';
import BadgeComponent from './BadgeComponent';

import cancelOrder from '../Api/cancelOrder';
import orderHistoryDetail from '../Api/orderHistoryDetail';

import backIcon from '../images/chevron-left-fff1dc.png';
import startIcon from '../images/start.png';
import endIcon from '../images/end.png';
import priceIcon from '../images/money.png';
import nightIcon from '../images/night.png';
import roomIcon from '../images/room.png';
import serviceIcon from '../images/service.png';

export default function BookingDetail({route, navigation}) {
  const {
    id,
    tenkhachsan,
    tenphong,
    sodem,
    soluongphong,
    giaphong,
    hinhanhsp,
  } = route.params.item;

  useEffect(() => {
    order_detail();
  }, []);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      dichvu: '',
      trangthai: '1',
      ngaynhanphong: '',
      ngaytraphong: '',
      hinhanh: hinhanhsp,
    },
  ]);
  const [status, setStatus] = useState(data[0].trangthai);

  var service = data[0].dichvu.split(', ');

  const order_detail = () => {
    orderHistoryDetail
      .orderHistoryDetail(id)
      .then((responseJson) => {
        setData(responseJson);
        setStatus(responseJson[0].trangthai);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const cancel_order = () => {
    setLoading(true);
    cancelOrder
      .cancelOrder(id)
      .then((responseJson) => {
        if (responseJson === 'Success') {
          setStatus('0');
          Toast.show('Đã hủy đặt phòng ' + tenphong + '!', {
            position: 0,
            duration: 3000,
          });
        } else {
          Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: -20,
            duration: 2500,
          });
        }
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

  const dichVuJSX = (
    <View>
      <View style={[styles.itemCont, {marginLeft: 5}]}>
        <Image style={styles.itemImg} source={serviceIcon} />
        <Text style={styles.dichVu}>Dịch vụ</Text>
      </View>
      {data[0].dichvu === '' ? (
        <Text style={styles.dvItem2}>Không có dịch vụ nào được chọn</Text>
      ) : (
        <View style={styles.dvCont}>
          <View style={{paddingLeft: 20}}>
            {service.map((element, index) => {
              if (index % 2 === 0) {
                return (
                  <Text key={index.toString()} style={styles.dvItem}>
                    {element}
                  </Text>
                );
              }
            })}
          </View>
          <View style={{paddingLeft: 14}}>
            {service.map((element, index) => {
              if (index % 2 !== 0) {
                return (
                  <Text key={index.toString()} style={styles.dvItem}>
                    {element}
                  </Text>
                );
              }
            })}
          </View>
        </View>
      )}
    </View>
  );

  const daHuyPhongJSX = (
    <LinearGradient
      style={styles.btnCont}
      colors={['rgba(82, 82, 82, 1)', 'rgba(201, 201, 201, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Đã hủy đặt phòng</Text>
      </View>
    </LinearGradient>
  );

  const huyDatPhongJSX = (
    <LinearGradient
      style={styles.btnCont}
      colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          cancel_order();
        }}>
        <View style={{width: width / 8}} />
        <Text style={styles.btnText}>Hủy đặt phòng</Text>
        <View style={{width: width / 8}}>
          {!loading ? null : (
            <ActivityIndicator animating={true} color="#fff" size="small" />
          )}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  var ngaynhan = ~~(new Date(data[0].ngaynhanphong) / 86400000);
  var today = ~~(new Date() / 86400000);
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

      <Image style={styles.img} source={{uri: data[0].hinhanh}} />
      <View style={styles.body}>
        <Text style={styles.name}>{tenkhachsan}</Text>
        <Text style={styles.room}>{tenphong}</Text>

        <View style={[styles.itemCont, {marginLeft: 5, marginBottom: 1}]}>
          <Image style={styles.itemImg2} source={priceIcon} />
          <Text style={styles.itemText2}>
            {Global.currencyFormat(
              (giaphong * sodem * soluongphong).toString(),
            )}{' '}
            đ
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={roomIcon} />
            <Text style={styles.itemText}>{soluongphong} phòng</Text>
          </View>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={nightIcon} />
            <Text style={styles.itemText}>{sodem} đêm</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={startIcon} />
            <Text style={styles.itemText}>{data[0].ngaynhanphong}</Text>
          </View>
          <View style={styles.itemCont}>
            <Image style={styles.itemImg} source={endIcon} />
            <Text style={styles.itemText}>{data[0].ngaytraphong}</Text>
          </View>
        </View>

        {dichVuJSX}
      </View>

      {status === '0'
        ? daHuyPhongJSX
        : ngaynhan - today >= 2
        ? huyDatPhongJSX
        : null}
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
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  img: {
    width: width,
    height: height / 3.2,
  },
  name: {
    color: '#393939',
    fontSize: width / 20,
    fontWeight: 'bold',
    width: width / 1.2 - 20,
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
    flexDirection: 'row',
  },
  btnText: {
    fontSize: width / 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  body: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  room: {
    color: '#616167',
    paddingLeft: 5,
    fontSize: width / 26,
    marginBottom: 20,
  },
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2.2,
    marginVertical: 7,
  },
  itemImg: {
    width: width / 16,
    height: width / 16,
  },
  itemImg2: {
    width: width / 12,
    height: width / 12,
  },
  itemText: {
    color: '#999999',
    marginLeft: 10,
    fontSize: width / 26,
  },
  itemText2: {
    color: '#616167',
    marginLeft: 10,
    fontSize: width / 22,
    fontWeight: 'bold',
  },
  dichVu: {
    color: '#616167',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: width / 25,
  },
  dvCont: {
    flexDirection: 'row',
  },
  dvItem: {
    color: '#999999',
    fontSize: width / 28,
    width: width / 2.5,
    marginBottom: 2,
  },
  dvItem2: {
    color: '#999999',
    fontSize: width / 28,
    marginLeft: 15,
  },
});
