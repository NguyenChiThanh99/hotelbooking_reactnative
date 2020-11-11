import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import stripe from 'tipsi-stripe';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from './Global';
import CartItem from './CartItem';
import {updateCart, updateHotel} from '../actions';

import {doPayment} from '../Api/doPayment';
import order from '../Api/order';
import deleteOrder from '../Api/deleteOrder';

import infoIcon from '../images/info.png';
import backIcon from '../images/chevron-left-fff1dc.png';
import userIcon from '../images/user-s.png';
import phoneIcon from '../images/phone.png';
import emailIcon from '../images/email.png';

stripe.setOptions({
  publishableKey: 'pk_test_nNsT1Tapm2K01DErmIgoCYka00Xl2AhJAY',
});

export default function Payment({navigation, route}) {
  const user = useSelector((state) => state.user);
  const infoUser = {
    name: route.params.name,
    email: route.params.email,
    phone: route.params.phone,
  };
  const cartData = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  var orderID = 0;

  const delete_Order = () => {
    setPending(true);
    deleteOrder
      .deleteOrder(orderID)
      .then((responseJson) => {
        setPending(false);
        console.log('Deleted order: ' + orderID);
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const dathang = () => {
    setLoading(true);
    setPending(true);
    var dichVuArray = [];
    for (let i = 0; i < cartData.length; i++) {
      dichVuArray.push(convertToString(cartData[i].dichVu));
    }
    order
      .order(
        infoUser.name,
        infoUser.email,
        infoUser.phone,
        user.id,
        cartData,
        dichVuArray,
      )
      .then((responseJson) => {
        orderID = responseJson;
        setLoading(false);
        setPending(false);
        payment();
      })
      .catch((err) => {
        delete_Order();
        setLoading(false);
        setPending(false);
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const dispatch = useDispatch();
  const payment = () => {
    setPending(true);
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        return doPayment(
          total,
          stripeTokenInfo.tokenId,
          infoUser.email,
          orderID,
        );
      })
      .then(() => {
        //Thanh toán thành công
        console.log('Payment succeeded!');
        setPending(false);
        dispatch(updateCart([]));
        storeData([]);
        dispatch(updateHotel(true));
        navigation.navigate('TABS', {payment: true});
      })
      .catch((error) => {
        delete_Order();
        setPending(false);
        Toast.show('Thanh toán thất bại:\n' + error, {
          position: -20,
          duration: 2500,
        });
        //Thanh toán thất bại
        console.log('Payment failed', {error});
      })
      .finally(() => {});
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.stepCont}>
          <LinearGradient
            style={styles.step}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.stepText}>1</Text>
          </LinearGradient>
          <View style={styles.line} />
          <LinearGradient
            style={styles.step}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.stepText}>2</Text>
          </LinearGradient>
        </View>

        <View style={styles.infoCont}>
          <View style={styles.headerInfo}>
            <Image source={infoIcon} style={styles.infoImg} />
            <Text style={styles.header}>Thông tin cá nhân</Text>
          </View>
          <View style={styles.infoCont2}>
            <Image source={userIcon} style={styles.infoIcon2} />
            <Text style={styles.info}>{infoUser.name}</Text>
          </View>
          <View style={styles.infoCont2}>
            <Image source={emailIcon} style={styles.infoIcon2} />
            <Text style={styles.info}>{infoUser.email}</Text>
          </View>
          <View style={styles.infoCont2}>
            <Image source={phoneIcon} style={styles.infoIcon2} />
            <Text style={styles.info}>{infoUser.phone}</Text>
          </View>
        </View>
      </View>
    );
  };

  var total = 0;
  for (var i = 0; i < cartData.length; i++) {
    total += cartData[i].giaPhong * cartData[i].soDem * cartData[i].soPhong;
  }

  const convertToString = (dichvu) => {
    var buffet = dichvu.buffet ? 'Bữa sáng Bufet, ' : '';
    var spa = dichvu.spa ? 'Dịch vụ Spa, ' : '';
    var phonghop = dichvu.phonghop ? 'Dịch vụ phòng họp, ' : '';
    var giatui = dichvu.giatui ? 'Dịch vụ giặt ủi quần áo, ' : '';
    var xeduadon = dichvu.xeduadon ? 'Dịch vụ xe đưa đón, ' : '';
    var dvphong = dichvu.dvphong ? 'Dịch vụ phòng 24/24, ' : '';
    var doingoaite = dichvu.doingoaite ? 'Thu đổi ngoại tệ' : '';
    return buffet + spa + phonghop + giatui + xeduadon + dvphong + doingoaite;
  };

  const userid = useSelector((state) => state.user.id);
  const storeData = async (value) => {
    var key = '@cart' + '_' + userid.toString();
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
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
        <View style={styles.titleCont}>
          <TouchableOpacity
            onPress={() => {
              pending ? null : navigation.goBack();
            }}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Xác nhận và Thanh toán</Text>
        </View>
        <View>
          <Image style={styles.cartIcon} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <FlatList
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listHotel}
          showsHorizontalScrollIndicator={false}
          data={cartData}
          renderItem={({item}) => {
            return (
              <CartItem
                id={item.id}
                image={item.image}
                hotelName={item.hotelName}
                roomName={item.roomName}
                soDem={item.soDem}
                soPhong={item.soPhong}
                dichVu={convertToString(item.dichVu)}
                giaPhong={item.giaPhong}
                ngayNhanPhong={item.ngayNhanPhong}
                ngayTraPhong={item.ngayTraPhong}
                from={false} // true is from cart, false is from payment
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>
          {Global.currencyFormat(total.toString())} đ
        </Text>
        <LinearGradient
          style={styles.btnCont}
          colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              pending ? null : dathang();
            }}>
            <View style={styles.loading} />
            <Text style={styles.btnText}>Xác nhận và Thanh toán</Text>
            <View style={styles.loading}>
              {loading ? (
                <ActivityIndicator animating={true} color="#fff" size="small" />
              ) : null}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const {width, backgroud_color, height_header, height} = Global;
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
    marginRight: 10,
  },
  btnCont: {
    margin: 10,
    marginTop: 5,
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
    flex: 1,
  },
  stepCont: {
    marginVertical: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  step: {
    width: width / 9,
    height: width / 9,
    borderRadius: width / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#fff',
    fontSize: width / 23,
  },
  line: {
    borderColor: '#FBB768',
    borderWidth: 1,
    width: width / 8,
  },
  infoCont: {
    width: width - 20,
    backgroundColor: '#393939',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoImg: {
    width: width / 16,
    height: width / 16,
  },
  header: {
    marginLeft: 5,
    fontSize: width / 26,
    color: '#fff',
  },
  info: {
    color: '#999999',
    marginLeft: 5,
  },
  infoIcon2: {
    width: width / 30,
    height: width / 30,
  },
  infoCont2: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  listHotel: {
    padding: 10,
    paddingBottom: 0,
  },
  total: {
    color: '#393939',
    fontSize: width / 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  footer: {
    borderTopColor: '#DFDEDE',
    borderBottomColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderWidth: 1,
  },
  loading: {
    width: width / 8,
  },
});
