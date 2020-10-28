import React from 'react';
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
import stripe from 'tipsi-stripe';

import Global from './Global';
import CartItem from './CartItem';

import infoIcon from '../images/info.png';
import backIcon from '../images/chevron-left-fff1dc.png';
import userIcon from '../images/user-s.png';
import phoneIcon from '../images/phone.png';
import emailIcon from '../images/email.png';

stripe.setOptions({
  publishableKey: 'pk_test_nNsT1Tapm2K01DErmIgoCYka00Xl2AhJAY',
});

export default function Payment({navigation}) {
  const payment = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        console.log(stripeTokenInfo);
        return {
          //Code API Thanh toán here
        };
      })
      .then(() => {
        console.log('Payment succeeded!');
        //Thanh toán thành công
        navigation.navigate('TABS');
      })
      .catch((error) => {
        Toast.show('Thanh toán thất bại:\n' + error, {
          position: -20,
          duration: 2500,
        });
        //Thanh toán thất bại
        console.log('Payment failed', {error});
      })
      .finally(() => {});
  };

  const infoUser = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0123456789',
  };

  const dataSample = [
    {
      id: 1,
      image:
        'https://q-cf.bstatic.com/xdata/images/hotel/max1024x768/140719216.jpg?k=54e2a279cf6a6cac89505439fcbb37631209ac775e7153ddbc1e5a14e45e3bb1&o=',
      hotelName: 'Saigon Sparkle Hotel',
      roomName: 'Phòng giường đôi',
      soDem: 3,
      soPhong: 1,
      dichVu:
        'Dịch vụ phòng họp, Dịch vụ Spa, Dịch vụ giặt ủi quần áo, Dịch vụ xe đưa đón',
      giaPhong: '653016',
      ngayNhanPhong: '10/15/2020',
      ngayTraPhong: '10/18/2020',
    },
    {
      id: 2,
      image:
        'https://q-cf.bstatic.com/xdata/images/hotel/max1024x768/140719216.jpg?k=54e2a279cf6a6cac89505439fcbb37631209ac775e7153ddbc1e5a14e45e3bb1&o=',
      hotelName: 'Saigon Sparkle Hotel',
      roomName: 'Phòng giường đôi',
      soDem: 3,
      soPhong: 1,
      dichVu:
        'Dịch vụ phòng họp, Dịch vụ Spa, Dịch vụ giặt ủi quần áo, Dịch vụ xe đưa đón',
      giaPhong: '653016',
      ngayNhanPhong: '10/15/2020',
      ngayTraPhong: '10/18/2020',
    },
  ];

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
  for (var i = 0; i < dataSample.length; i++) {
    total +=
      dataSample[i].giaPhong * dataSample[i].soDem * dataSample[i].soPhong;
  }

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
          data={dataSample}
          renderItem={({item}) => {
            return (
              <CartItem
                id={item.id}
                image={item.image}
                hotelName={item.hotelName}
                roomName={item.roomName}
                soDem={item.soDem}
                soPhong={item.soPhong}
                dichVu={item.dichVu}
                giaPhong={item.giaPhong}
                ngayNhanPhong={item.ngayNhanPhong}
                ngayTraPhong={item.ngayTraPhong}
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
          <TouchableOpacity style={styles.btn} onPress={() => payment()}>
            <Text style={styles.btnText}>Xác nhận và Thanh toán</Text>
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
});
