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
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from './Global';
import {updateUser, updateCart} from '../actions';

import updateUserInfo from '../Api/updateUserInfo';
import updatePass from '../Api/updatePass';

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

  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    id: user.id,
    userName: user.tendangnhap,
    password: user.matkhau,
    name: user.hoten,
    email: user.email,
    phone: user.sodienthoai,
  });

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const updateInfo = () => {
    setLoading(true);
    if (newName.length > 0 && newName.length < 3) {
      setLoading(false);
      return Toast.show('Vui lòng nhập Họ và Tên ít nhất 3 ký tự', {
        position: -20,
        duration: 2000,
      });
    }
    if (newEmail.length > 0 && !Global.validateEmail(newEmail)) {
      setLoading(false);
      return Toast.show('Vui lòng kiểm tra lại Email', {
        position: -20,
        duration: 2000,
      });
    }
    if (newPhone.length > 0 && newPhone.length < 10) {
      setLoading(false);
      return Toast.show('Vui lòng nhập đúng số điện thoại', {
        position: -20,
        duration: 2000,
      });
    }
    updateUserInfo
      .updateUserInfo(data.id, newName, newPhone, newEmail)
      .then((responseJson) => {
        if (responseJson === 'Fail') {
          setLoading(false);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: -20,
            duration: 2000,
          });
        } else {
          setData({
            id: 8,
            userName: user.tendangnhap,
            password: user.matkhau,
            name: newName === '' ? data.name : newName,
            email: newEmail === '' ? data.email : newEmail,
            phone: newPhone === '' ? data.phone : newPhone,
          });
          setLoading(false);
          Toast.show('Cập nhật thông tin thành công', {
            position: -20,
            duration: 2000,
          });
          setModalUpdateInfo(!modalUpdateInfo);
          setnewName('');
          setnewEmail('');
          setnewPhone('');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2000,
        });
      });
  };

  const update_Pass = () => {
    setLoading2(true);
    if (newPass.length === 0 || renewPass.length === 0) {
      setLoading2(false);
      return Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: -20,
        duration: 2000,
      });
    } else if (newPass.length < 8) {
      setLoading2(false);
      return Toast.show('Mật khẩu cần ít nhất 8 ký tự', {
        position: -20,
        duration: 2000,
      });
    } else if (newPass !== renewPass) {
      setLoading2(false);
      return Toast.show('Mật khẩu nhập lại không đúng', {
        position: -20,
        duration: 2000,
      });
    }
    updatePass
      .updatePass(data.id, newPass)
      .then((responseJson) => {
        if (responseJson === 'Fail') {
          setLoading2(false);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: -20,
            duration: 2000,
          });
        } else {
          setData({
            id: 8,
            userName: user.tendangnhap,
            password: newPass,
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
          setLoading2(false);
          Toast.show('Cập nhật Mật khẩu thành công', {
            position: -20,
            duration: 2000,
          });
          setnewPass('');
          setrenewPass('');
          setModalChangePass(!modalChangePass);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading2(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2000,
        });
      });
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(updateCart([]));
    dispatch(
      updateUser({
        id: '',
        userName: '',
        password: '',
        name: '',
        email: '',
        phone: '',
      }),
    );
    storeData(null);
    BackHandler.exitApp();
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
          onPress={() => navigation.navigate('HISTORY', {idUser: data.id})}
          style={[styles.line, styles.buttonItem]}>
          <Text style={styles.buttonText}>Lịch sử đặt phòng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalLogout(true)}
          style={styles.buttonItem}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
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
                    if (pass === data.password) {
                      setPass('');
                      setModalUpdate(!modalUpdate);
                      setModalUpdateInfo(true);
                    } else {
                      Toast.show('Mật khẩu không đúng', {
                        position: -20,
                        duration: 2000,
                      });
                    }
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
                    if (pass === data.password) {
                      setPass('');
                      setModalUpdate(!modalUpdate);
                      setModalChangePass(true);
                    } else {
                      Toast.show('Mật khẩu không đúng', {
                        position: -20,
                        duration: 2000,
                      });
                    }
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
              <Text style={styles.nameModal}>Đăng xuất</Text>
            </LinearGradient>
            <Text style={styles.modalText}>
              Bạn có chắc muốn đăng xuất khỏi ứng dụng?
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
                <TouchableOpacity style={styles.btn} onPress={() => logout()}>
                  <Text style={styles.btnText}>Đăng xuất</Text>
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
                    setLoading(false);
                  }}>
                  <Text style={styles.btnText}>Thoát</Text>
                </TouchableOpacity>
              </LinearGradient>

              <ActivityIndicator
                animating={loading}
                color="#F8A170"
                size="small"
              />

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    updateInfo();
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
                    setLoading2(false);
                  }}>
                  <Text style={styles.btnText}>Thoát</Text>
                </TouchableOpacity>
              </LinearGradient>

              <ActivityIndicator
                animating={loading2}
                color="#F8A170"
                size="small"
              />

              <LinearGradient
                style={styles.btnCont}
                colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    update_Pass();
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
    color: '#616167',
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
