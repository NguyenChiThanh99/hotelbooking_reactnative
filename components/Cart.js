/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useReducer} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SwipeListView} from 'react-native-swipe-list-view';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import NumericInput from 'react-native-numeric-input';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-root-toast';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from './Global';
import CartItem from './CartItem';
import {updateCart} from '../actions';

import backIcon from '../images/chevron-left-fff1dc.png';
import homeIcon from '../images/home-fff1dc.png';
var countExit = 0;

export default function Cart({route, navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route === undefined) {
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
        }
        if (!route.params.fromMain) {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setselectedEndDate] = useState(
    new Date().getTime() + 24 * 60 * 60 * 1000,
  );
  const [sophong, setSophong] = useState(1);
  const [buffet, setBuffet] = useState(false);
  const [spa, setSpa] = useState(false);
  const [phonghop, setPhonghop] = useState(false);
  const [giatui, setGiatui] = useState(false);
  const [xeduadon, setXeduadon] = useState(false);
  const [dvphong, setDvphong] = useState(false);
  const [doingoaite, setDoingoaite] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rowMap, setRowMap] = useState();
  const [item, setItem] = useState();

  const minDate = new Date(); // Today
  const maxDate = new Date(2021, 12, 31);
  var sodem = (selectedEndDate - selectedStartDate) / 86400000;
  moment.locale();

  const backElement = (
    <TouchableOpacity onPress={() => navigation.goBack()} visible={false}>
      <Image source={backIcon} style={styles.backIcon} />
    </TouchableOpacity>
  );
  const homeElement = (
    <TouchableOpacity onPress={() => navigation.navigate('TABS')}>
      <Image source={homeIcon} style={styles.homeIcon} />
    </TouchableOpacity>
  );

  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  var total = 0;
  for (var i = 0; i < cartData.length; i++) {
    total += cartData[i].giaPhong * cartData[i].soDem * cartData[i].soPhong;
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  function rerenderComponent() {
    forceUpdate();
  }

  const deleteItem = (rowMap, data) => {
    Alert.alert(
      '',
      'Bạn có chắc muốn xóa ' +
        data.roomName +
        ' của khách sạn ' +
        data.hotelName +
        '?',
      [
        {
          text: 'Hủy bỏ',
          onPress: () => {
            rowMap[data.id].closeRow();
          },
          style: 'cancel',
        },
        {
          text: 'Xóa phòng',
          onPress: () => {
            var index = cartData.indexOf(data);
            cartData.splice(index, 1);
            dispatch(updateCart(cartData));
            storeData(cartData);
            rerenderComponent();
          },
        },
      ],
      {cancelable: true},
    );
  };

  const updateRow = () => {
    const startDate = ~~(selectedStartDate / 86400000);
    const currDate = ~~(new Date() / 86400000);
    const endDate = ~~(selectedEndDate / 86400000);

    if (startDate < currDate || endDate < currDate) {
      Toast.show('Vui lòng kiểm tra lại ngày nhận phòng và ngày trả phòng', {
        position: -20,
        duration: 2000,
      });
      return;
    } else if (sodem < 1) {
      Toast.show('Bạn chưa chọn ngày nhận phòng và trả phòng', {
        position: -20,
        duration: 2000,
      });
      return;
    }
    var i = cartData.indexOf(item);
    cartData[i].soDem = sodem;
    cartData[i].soPhong = sophong;
    cartData[i].dichVu = {
      buffet: buffet,
      spa: spa,
      phonghop: phonghop,
      giatui: giatui,
      xeduadon: xeduadon,
      dvphong: dvphong,
      doingoaite: doingoaite,
    };
    cartData[i].ngayNhanPhong = moment(selectedStartDate).format('l');
    cartData[i].ngayTraPhong = moment(selectedEndDate).format('l');

    dispatch(updateCart(cartData));
    storeData(cartData);
    setModalVisible(!modalVisible);
    rowMap[item.id].closeRow();
    rerenderComponent();
  };

  const editRow = (rowMap, data) => {
    setSelectedStartDate(new Date(data.ngayNhanPhong));
    setselectedEndDate(new Date(data.ngayTraPhong));
    setSophong(data.soPhong);
    setBuffet(data.dichVu.buffet);
    setSpa(data.dichVu.spa);
    setPhonghop(data.dichVu.phonghop);
    setGiatui(data.dichVu.giatui);
    setXeduadon(data.dichVu.xeduadon);
    setDvphong(data.dichVu.dvphong);
    setDoingoaite(data.dichVu.doingoaite);
    setName(data.hotelName);
    setPrice(data.giaPhong);
    setRowMap(rowMap);
    setItem(data);
    setModalVisible(true);
  };

  const renderItem = (data) => (
    <CartItem
      id={data.item.id}
      image={data.item.image}
      hotelName={data.item.hotelName}
      roomName={data.item.roomName}
      soDem={data.item.soDem}
      soPhong={data.item.soPhong}
      dichVu={convertToString(data.item.dichVu)}
      giaPhong={data.item.giaPhong}
      ngayNhanPhong={data.item.ngayNhanPhong}
      ngayTraPhong={data.item.ngayTraPhong}
      from={true} // true is from cart, false is from payment
    />
  );

  const renderHiddenItem = (data, rowMap) => (
    <LinearGradient
      style={styles.rowBack}
      colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => editRow(rowMap, data.item)}>
        <Text style={styles.backTextWhite}>Sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteItem(rowMap, data.item)}>
        <Text style={styles.backTextWhite}>Xóa</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setselectedEndDate(null);
    }
  };

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

  const user = useSelector((state) => state.user.id);
  const storeData = async (value) => {
    var key = '@cart' + '_' + user.toString();
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {route === undefined ? null : backElement}
            <Text style={styles.headerText}>Giỏ hàng</Text>
          </View>
          {route === undefined ? null : homeElement}
        </View>
      </LinearGradient>

      {cartData.length === 0 ? (
        <Text
          style={{
            flex: 1,
            alignSelf: 'center',
            marginTop: height / 2.5,
            color: '#999',
          }}>
          Không có sản phẩm nào trong giỏ hàng{' '}
        </Text>
      ) : (
        <SwipeListView
          contentContainerStyle={styles.listHotel}
          data={cartData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {cartData.length === 0 ? null : (
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
              onPress={() => navigation.navigate('PERSONAL_INFORMATION')}>
              <Text style={styles.btnText}>Đặt phòng</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              style={styles.titleModal}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.nameModal}>{name}</Text>
              {sodem >= 1 ? (
                <Text style={styles.priceModal}>
                  {Global.currencyFormat((price * sophong * sodem).toString())}{' '}
                  đ
                </Text>
              ) : null}
            </LinearGradient>
            <ScrollView>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="#1d32b8"
                selectedDayColor="#FBB768"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
              />

              {sodem % 1 === 0 && sodem !== 0 ? (
                <View style={styles.sodemCont}>
                  <Text style={styles.sodem1}>Số đêm: </Text>
                  <Text style={styles.sodem1}>{sodem} đêm </Text>
                  <Text style={styles.sodem2}>
                    (từ {moment(selectedStartDate).format('l')} đến{' '}
                    {moment(selectedEndDate).format('l')})
                  </Text>
                </View>
              ) : null}

              <View style={styles.sophongCont}>
                <Text style={styles.sophong}>Số phòng: </Text>
                <NumericInput
                  value={sophong}
                  onChange={(value) => setSophong(value)}
                  totalWidth={width / 3.2}
                  totalHeight={height / 25}
                  borderColor={'#FBB768'}
                  rounded
                  minValue={1}
                  maxValue={10}
                  iconStyle={{color: 'white'}}
                  containerStyle={{borderRadius: 8, borderColor: '#FBB768'}}
                  rightButtonBackgroundColor="#FBB768"
                  leftButtonBackgroundColor="#FBB768"
                />
                <Text style={styles.sophong}> phòng</Text>
              </View>

              <Text style={styles.service}>Các dịch vụ khác:</Text>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={buffet}
                  onValueChange={(newValue) => setBuffet(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setBuffet(!buffet);
                  }}>
                  <Text style={styles.checkbox}>Bữa sáng Buffet</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={spa}
                  onValueChange={(newValue) => setSpa(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSpa(!spa);
                  }}>
                  <Text style={styles.checkbox}>Dịch vụ Spa</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={phonghop}
                  onValueChange={(newValue) => setPhonghop(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setPhonghop(!phonghop);
                  }}>
                  <Text style={styles.checkbox}>Dịch vụ phòng họp</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={giatui}
                  onValueChange={(newValue) => setGiatui(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setGiatui(!giatui);
                  }}>
                  <Text style={styles.checkbox}>Dịch vụ giặt ủi quần áo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={xeduadon}
                  onValueChange={(newValue) => setXeduadon(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setXeduadon(!xeduadon);
                  }}>
                  <Text style={styles.checkbox}>Dịch vụ xe đưa đón</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={dvphong}
                  onValueChange={(newValue) => setDvphong(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setDvphong(!dvphong);
                  }}>
                  <Text style={styles.checkbox}>Dịch vụ phòng 24/24</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxCont}>
                <CheckBox
                  tintColors={{true: '#FBB768', false: '#616167'}}
                  value={doingoaite}
                  onValueChange={(newValue) => setDoingoaite(newValue)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setDoingoaite(!doingoaite);
                  }}>
                  <Text style={styles.checkbox}>Thu đổi ngoại tệ</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnModalCont}>
                <LinearGradient
                  style={styles.btnCont2}
                  colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      rowMap[item.id].closeRow();
                    }}>
                    <Text style={styles.btnText2}>Hủy bỏ</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  style={styles.btnCont2}
                  colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={() => {
                      updateRow();
                    }}>
                    <Text style={styles.btnText2}>Hoàn tất</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {width, height, backgroud_color, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  headerContainer: {
    backgroundColor: backgroud_color,
    height: height_header,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
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
    marginRight: 5,
  },
  homeIcon: {
    width: width / 15,
    resizeMode: 'contain',
  },
  titleCont: {
    flexDirection: 'row',
    height: height_header,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 20,
  },
  listHotel: {
    padding: 10,
    paddingBottom: 0,
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
  total: {
    color: '#393939',
    fontSize: width / 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 8,
  },
  footer: {
    borderTopColor: '#DFDEDE',
    borderBottomColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
    borderRightColor: '#fff',
    borderRightWidth: 1,
    marginVertical: 15,
  },
  backRightBtnRight: {
    right: 0,
  },
  backTextWhite: {
    color: '#fff',
  },
  centeredView: {
    height: height / 1.7,
    marginTop: height / 6,
  },
  modalView: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
  },
  unit: {
    fontSize: width / 36,
    color: '#999999',
    marginLeft: 20,
  },
  sophongCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  sodem1: {
    color: '#393939',
    fontSize: width / 28,
  },
  sodem2: {
    color: '#616167',
    fontSize: width / 28,
  },
  sodemCont: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  sophong: {
    color: '#393939',
    fontSize: width / 28,
  },
  service: {
    paddingHorizontal: 10,
    marginTop: 8,
    color: '#393939',
    fontSize: width / 28,
    fontWeight: 'bold',
  },
  checkboxCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  checkbox: {
    color: '#616167',
    fontSize: width / 30,
  },
  btnCont2: {
    borderRadius: 8,
    height: height / 20,
  },
  btn2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: height / 20,
    width: width / 2.4,
  },
  btnText2: {
    fontSize: width / 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  btnModalCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  titleModal: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameModal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width / 22,
  },
  priceModal: {
    color: '#fff',
    fontSize: width / 26,
  },
});
