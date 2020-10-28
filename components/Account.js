import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import Global from './Global';

import userIcon from '../images/user-s.png';
import nameIcon from '../images/name.png';
import passIcon from '../images/password.png';
import emailIcon from '../images/email.png';
import phoneIcon from '../images/phone.png';
import nameIconW from '../images/name-w.png';
import emailIconW from '../images/email-w.png';
import phoneIconW from '../images/phone-w.png';
import passIconW from '../images/password-w.png';
var countExit = 0;

export default function Account({navigation}) {
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

  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalUpdateInfo, setModalUpdateInfo] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);

  const [pass, setPass] = useState('');
  const [newName, setnewName] = useState('');
  const [newPhone, setnewPhone] = useState('');
  const [newEmail, setnewEmail] = useState('');
  const [newPass, setnewPass] = useState('');
  const [renewPass, setrenewPass] = useState('');

  const data = {
    userName: 'samantha_doe',
    password: '123456789',
    name: 'Samantha Doe',
    email: 'samantha_doe@gmail.com',
    phone: '0123458875',
  };

  var new_password = '';
  for (let i = 0; i < data.password.length; i++) {
    new_password += '*';
  }

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <LinearGradient
        style={styles.headerContainer}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
          Tài khoản {data.userName}
        </Text>
      </LinearGradient>

      <View style={styles.infoCont}>
        <View style={[styles.infoItem, styles.line]}>
          <Image source={userIcon} style={styles.infoImg} />
          <Text style={styles.infoText}>{data.userName}</Text>
        </View>
        <View style={[styles.infoItem, styles.line]}>
          <Image source={passIcon} style={styles.infoImg} />
          <Text style={styles.infoText}>{new_password}</Text>
        </View>
        <View style={[styles.infoItem, styles.line]}>
          <Image source={nameIcon} style={styles.infoImg} />
          <Text style={styles.infoText}>{data.name}</Text>
        </View>
        <View style={[styles.infoItem, styles.line]}>
          <Image source={emailIcon} style={styles.infoImg} />
          <Text style={styles.infoText}>{data.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Image source={phoneIcon} style={styles.infoImg} />
          <Text style={styles.infoText}>{data.phone}</Text>
        </View>
      </View>

      <LinearGradient
        style={styles.buttonCont}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          onPress={() => setModalUpdate(true)}
          style={[styles.line, styles.buttonItem]}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('HISTORY')}
          style={[styles.line, styles.buttonItem]}>
          <Text style={styles.buttonText}>Lịch sử đặt phòng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalLogout(true)}
          style={styles.buttonItem}>
          <Text style={styles.buttonText}>Thoát ứng dụng</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Modal animationType="slide" transparent={true} visible={modalUpdate}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              style={styles.titleModal}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.nameModal}>Cập nhật</Text>
            </LinearGradient>
            <Text style={styles.modalText}>Nhập mật khẩu để tiếp tục</Text>
            <View style={styles.inputCont}>
              <TextInput
                onChangeText={(text) => setPass(text)}
                value={pass}
                style={styles.textInputStyle}
                placeholder="Mật khẩu"
                underlineColorAndroid="#e8e8e8"
                placeholderTextColor="#b5b5b5"
                autoCapitalize="none"
                secureTextEntry={true}
              />
              <Image style={styles.iconInput} source={passIconW} />
            </View>

            <View style={styles.button}>
              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setModalUpdate(!modalUpdate);
                    setPass('');
                  }}>
                  <Text style={styles.btnText}>Thoát</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setPass('');
                    setModalUpdate(!modalUpdate);
                    setModalUpdateInfo(true);
                  }}>
                  <Text style={styles.btnText}>Cập nhật thông tin</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setPass('');
                    setModalUpdate(!modalUpdate);
                    setModalChangePass(true);
                  }}>
                  <Text style={styles.btnText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalLogout}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              style={styles.titleModal}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.nameModal}>Thoát ứng dụng</Text>
            </LinearGradient>
            <Text style={styles.modalText}>
              Bạn có chắc muốn khoát khỏi ứng dụng?
            </Text>

            <View style={styles.button}>
              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setModalLogout(!modalLogout);
                  }}>
                  <Text style={styles.btnText}>Hủy bỏ</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => BackHandler.exitApp()}>
                  <Text style={styles.btnText}>Thoát ứng dụng</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalUpdateInfo}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              style={styles.titleModal}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.nameModal}>Cập nhật thông tin</Text>
            </LinearGradient>
            <Text style={styles.modalText}>
              Nhập thông tin bạn cần thay đổi
            </Text>
            <View style={styles.inputCont}>
              <TextInput
                onChangeText={(text) => setnewName(text)}
                value={newName}
                placeholder={'Họ và Tên mới'}
                style={styles.textInputStyle}
                underlineColorAndroid="#e8e8e8"
                placeholderTextColor="#b5b5b5"
                autoCapitalize="none"
                autoCompleteType="name"
              />
              <Image style={styles.iconInput} source={nameIconW} />
            </View>
            <View style={styles.inputCont}>
              <TextInput
                onChangeText={(text) => setnewEmail(text)}
                value={newEmail}
                placeholder={'Email mới'}
                style={styles.textInputStyle}
                underlineColorAndroid="#e8e8e8"
                placeholderTextColor="#b5b5b5"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
              />
              <Image style={styles.iconInput} source={emailIconW} />
            </View>
            <View style={styles.inputCont}>
              <TextInput
                onChangeText={(text) => setnewPhone(text)}
                value={newPhone}
                placeholder={'Số Điện Thoại mới'}
                style={styles.textInputStyle}
                underlineColorAndroid="#e8e8e8"
                placeholderTextColor="#b5b5b5"
                autoCapitalize="none"
                autoCompleteType="tel"
                keyboardType="phone-pad"
                maxLength={10}
              />
              <Image style={styles.iconInput} source={phoneIconW} />
            </View>

            <View style={styles.button}>
              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setModalUpdateInfo(!modalUpdateInfo);
                    setnewName('');
                    setnewEmail('');
                    setnewPhone('');
                  }}>
                  <Text style={styles.btnText}>Thoát</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setModalUpdateInfo(!modalUpdateInfo);
                    setnewName('');
                    setnewEmail('');
                    setnewPhone('');
                  }}>
                  <Text style={styles.btnText}>Xác nhận</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalChangePass}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              style={styles.titleModal}
              colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.nameModal}>Đổi mật khẩu</Text>
            </LinearGradient>
            <Text style={styles.modalText}>Nhập mật khẩu mới</Text>

            <View style={styles.inputCont}>
              <TextInput
                onChangeText={(text) => setnewPass(text)}
                value={newPass}
                style={styles.textInputStyle}
                underlineColorAndroid="#e8e8e8"
                placeholderTextColor="#b5b5b5"
                autoCapitalize="none"
                placeholder="Mật khẩu"
                secureTextEntry={true}
              />
              <Image style={styles.iconInput} source={passIconW} />
            </View>
            <View style={styles.inputCont}>
              <TextInput
                onChangeText={(text) => setrenewPass(text)}
                value={renewPass}
                style={styles.textInputStyle}
                underlineColorAndroid="#e8e8e8"
                placeholderTextColor="#b5b5b5"
                autoCapitalize="none"
                placeholder="Mật khẩu"
                secureTextEntry={true}
              />
              <Image style={styles.iconInput} source={passIconW} />
            </View>

            <View style={styles.button}>
              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setnewPass('');
                    setrenewPass('');
                    setModalChangePass(!modalChangePass);
                  }}>
                  <Text style={styles.btnText}>Thoát</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setnewPass('');
                    setrenewPass('');
                    setModalChangePass(!modalChangePass);
                  }}>
                  <Text style={styles.btnText}>Xác nhận</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {width, height, backgroud_color, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f0f0f0',
    flex: 1,
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
    width: width - 20,
  },
  infoCont: {
    margin: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    width: width - 40,
  },
  line: {
    borderBottomColor: '#dfdede',
    borderBottomWidth: 1,
  },
  infoImg: {
    width: width / 20,
    height: width / 20,
  },
  infoText: {
    fontSize: width / 25,
    color: '#616167',
    marginLeft: 10,
  },
  centeredView: {
    height: height / 1.7,
    marginTop: height / 5,
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
  buttonCont: {
    margin: 10,
    borderRadius: 15,
    padding: 10,
  },
  buttonItem: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: width / 26,
    fontWeight: 'bold',
  },
  btnCont: {
    borderRadius: 8,
    height: height / 20,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: height / 20,
    paddingHorizontal: 15,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  textInputStyle: {
    fontSize: width / 26,
  },
  iconInput: {
    width: width / 18,
    height: width / 18,
  },
  inputCont: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalText: {
    color: '#616167',
    fontSize: width / 26,
    margin: 10,
    marginBottom: 0,
  },
});
