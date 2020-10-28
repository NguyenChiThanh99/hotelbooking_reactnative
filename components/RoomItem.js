/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import NumericInput from 'react-native-numeric-input';
import CheckBox from '@react-native-community/checkbox';

import Global from './Global';

import userIcon from '../images/user-1.png';
import userIcon2 from '../images/user-2.png';
import userIcon3 from '../images/user-3.png';
import userIcon4 from '../images/user-4.png';
import userIcon5 from '../images/user-5.png';

export default function RoomList(props) {
  const {
    image,
    name,
    sogiuong,
    price,
    sokhach,
    id,
    navigation,
    idkhachsan,
    tenkhachsan,
  } = props;
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

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setselectedEndDate(null);
    }
  };

  const minDate = new Date(); // Today
  const maxDate = new Date(2021, 12, 31);
  var sodem = (selectedEndDate - selectedStartDate) / 86400000;
  moment.locale();

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: image}} style={styles.background} />
      <View style={{margin: 10}}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.sokhach}>
          <Text style={styles.info}>Giá cho:</Text>
          {parseInt(sokhach) === 1 ? (
            <Image source={userIcon} style={styles.userIcon} />
          ) : parseInt(sokhach) === 2 ? (
            <Image source={userIcon2} style={styles.userIcon} />
          ) : parseInt(sokhach) === 3 ? (
            <Image source={userIcon3} style={styles.userIcon} />
          ) : parseInt(sokhach) === 4 ? (
            <Image source={userIcon4} style={styles.userIcon} />
          ) : (
            <Image source={userIcon5} style={styles.userIcon} />
          )}
        </View>
        <View style={styles.sogiuong}>
          <Text style={styles.info}>Số giường:</Text>
          <Text style={styles.info}>{sogiuong}</Text>
        </View>
        <View style={styles.priceCont}>
          <View>
            <Text style={styles.price}>{Global.currencyFormat(price)} đ</Text>
            <Text style={styles.unit}>1 đêm</Text>
          </View>
          <LinearGradient
            style={styles.btnCont}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setModalVisible(true);
                setSelectedStartDate(minDate);
                setselectedEndDate(minDate.getTime() + 24 * 60 * 60 * 1000);
              }}>
              <Text style={styles.btnText}>Chọn</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

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
                      setModalVisible(!modalVisible);
                      navigation.navigate('CART', {fromMain: false});
                    }}>
                    <Text style={styles.btnText2}>Thêm vào giỏ hàng</Text>
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

const {width, height} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: width - 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  background: {
    width: width - 20,
    height: height / 4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  name: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: width / 22,
    marginBottom: height / 50,
  },
  userIcon: {
    width: width / 5,
    height: height / 40,
  },
  sogiuong: {
    flexDirection: 'row',
  },
  sokhach: {
    flexDirection: 'row',
  },
  info: {
    color: '#616167',
    marginRight: 5,
  },
  btnCont: {
    borderRadius: 10,
    height: height / 20,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: height / 20,
    width: width / 3,
  },
  btnText: {
    fontSize: width / 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  priceCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 40,
    marginTop: 5,
  },
  price: {
    fontSize: width / 20,
    color: '#393939',
    fontWeight: 'bold',
    marginLeft: 20,
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
    fontSize: width / 38,
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
