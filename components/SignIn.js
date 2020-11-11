/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import Global from '../components/Global';
import {updateUser} from '../actions';
import signIn from '../Api/signIn';

import userIcon from '../images/user-s.png';
import passIcon from '../images/password.png';
import signinIcon from '../images/arrow-right.png';
import loginBackground from '../images/login.png';

export default function LogIn({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    loadFirstScreen();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loadFirstScreen = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      if (jsonValue === 'null' || jsonValue === null) {
        setLoading(false);
        dispatch(updateUser(null));
      } else {
        dispatch(updateUser(JSON.parse(jsonValue)));
        setLoading(false);
        navigation.navigate('MAIN');
      }
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const signin = () => {
    Keyboard.dismiss();
    setLoading(true);
    if (username.length === 0 || password.length === 0) {
      setLoading(false);
      return Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: -20,
        duration: 2500,
      });
    }
    signIn
      .signIn(username, password)
      .then((responseJson) => {
        if (responseJson === 'not exist') {
          Toast.show('Tên đăng nhập hoặc Mật khẩu không đúng', {
            position: -20,
            duration: 2500,
          });
        } else {
          storeData(responseJson);
          dispatch(updateUser(responseJson));
          setUsername('');
          setPassword('');
          navigation.navigate('MAIN');
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

  return (
    <LinearGradient
      style={styles.wrapper}
      colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.title}>ĐĂNG NHẬP</Text>
      <ImageBackground source={loginBackground} style={styles.background}>
        <View style={styles.inputCont}>
          <Image style={styles.iconInput} source={userIcon} />
          <TextInput
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder={'Tên đăng nhập'}
            style={styles.textInputStyle}
            underlineColorAndroid="#fff"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputCont}>
          <Image style={styles.iconInput} source={passIcon} />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.textInputStyle}
            underlineColorAndroid="#fff"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            placeholder="Mật khẩu"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.signupCont}>
          <View style={{width: width / 10}} />
          <ActivityIndicator animating={loading} color="#F8A170" size="large" />
          <TouchableOpacity onPress={() => signin()}>
            <Image source={signinIcon} style={styles.signinIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.noAccTitle}>Chưa có tài khoản?</Text>
          <LinearGradient
            style={styles.btnCont}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('SIGNUP')}>
              <Text style={styles.btnText}>Đăng ký</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const {height, width} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  background: {
    width: width / 1.15,
    height: height / 1.3,
    padding: 20,
    paddingTop: width / 5,
  },
  title: {
    color: '#fff',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
  inputCont: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: height / 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b5b5b5',
  },
  textInputStyle: {
    fontSize: width / 26,
    marginLeft: 10,
    color: '#616167',
  },
  iconInput: {
    width: width / 18,
    height: width / 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width / 1.15,
    padding: 20,
  },
  signinIcon: {
    width: width / 10,
    height: width / 10,
    alignSelf: 'flex-end',
  },
  signupCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height / 50,
  },
  noAccTitle: {
    color: '#616167',
    fontWeight: 'bold',
    fontSize: width / 28,
  },
  btnCont: {
    marginTop: 10,
    borderRadius: 10,
    height: height / 16,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: height / 16,
  },
  btnText: {
    fontSize: width / 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
