import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import Global from '../components/Global';

import signUp from '../Api/signUp';

import userIcon from '../images/user-s.png';
import passIcon from '../images/password.png';
import nameIcon from '../images/name.png';
import emailIcon from '../images/email.png';
import phoneIcon from '../images/phone.png';
import signinIcon from '../images/arrow-right.png';
import signupBackground from '../images/signup.png';

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const signup = () => {
    setLoading(true);
    if (
      username.length === 0 ||
      password.length === 0 ||
      repassword.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      phone.length === 0
    ) {
      setLoading(false);
      return Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: -20,
        duration: 2500,
      });
    }
    if (username.length < 8) {
      setLoading(false);
      return Toast.show('Tên đăng nhập cần ít nhất 8 ký tự', {
        position: -20,
        duration: 2500,
      });
    }
    if (password.length < 8) {
      setLoading(false);
      return Toast.show('Mật khẩu cần ít nhất 8 ký tự', {
        position: -20,
        duration: 2500,
      });
    }
    if (repassword !== password) {
      setLoading(false);
      return Toast.show('Mật khẩu nhập lại không đúng', {
        position: -20,
        duration: 2500,
      });
    }
    if (name.length < 3) {
      setLoading(false);
      return Toast.show('Vui lòng nhập Họ và Tên ít nhất 3 ký tự', {
        position: -20,
        duration: 2500,
      });
    }
    if (!Global.validateEmail(email)) {
      setLoading(false);
      return Toast.show('Vui lòng kiểm tra lại Email', {
        position: -20,
        duration: 2500,
      });
    }
    if (phone.length < 10) {
      setLoading(false);
      return Toast.show('Vui lòng nhập đúng số điện thoại', {
        position: -20,
        duration: 2500,
      });
    }
    signUp
      .signUp(username, password, name, email, phone)
      .then((responseJson) => {
        if (responseJson === 'exist') {
          Toast.show('Tên đăng nhập và Email đã tồn tại', {
            position: -20,
            duration: 2500,
          });
        } else if (responseJson === 'username exist') {
          Toast.show('Tên đăng nhập đã tồn tại', {
            position: -20,
            duration: 2500,
          });
        } else if (responseJson === 'email exist') {
          Toast.show('Email đã tồn tại', {
            position: -20,
            duration: 2500,
          });
        } else {
          Toast.show('Đăng ký tài khoản thành công, vui lòng đăng nhập', {
            position: -20,
            duration: 2500,
          });
          setUsername('');
          setPassword('');
          setRepassword('');
          setName('');
          setEmail('');
          setPhone('');
          navigation.navigate('SIGNIN');
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
      <Text style={styles.title}>ĐĂNG KÝ</Text>
      <ImageBackground source={signupBackground} style={styles.background}>
        <View style={styles.inputCont}>
          <Image style={styles.iconInput} source={nameIcon} />
          <TextInput
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder={'Họ và Tên'}
            style={styles.textInputStyle}
            underlineColorAndroid="#fff"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            autoCompleteType="name"
          />
        </View>
        <View style={styles.inputCont}>
          <Image style={styles.iconInput} source={emailIcon} />
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder={'Email'}
            style={styles.textInputStyle}
            underlineColorAndroid="#fff"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputCont}>
          <Image style={styles.iconInput} source={phoneIcon} />
          <TextInput
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholder={'Số điện thoại'}
            style={styles.textInputStyle}
            underlineColorAndroid="#fff"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
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
        <View style={styles.inputCont}>
          <Image style={styles.iconInput} source={passIcon} />
          <TextInput
            onChangeText={(text) => setRepassword(text)}
            value={repassword}
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
          <TouchableOpacity onPress={() => signup()}>
            <Image source={signinIcon} style={styles.signinIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.noAccTitle}>Đã có tài khoản?</Text>
          <LinearGradient
            style={styles.btnCont}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('SIGNIN')}>
              <Text style={styles.btnText}>Đăng nhập</Text>
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
    height: height / 1.15,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
  inputCont: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: height / 50,
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
  signupCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height / 50,
  },
});
