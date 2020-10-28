import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

import backIcon from '../images/chevron-left-fff1dc.png';
import nameIcon from '../images/name-w.png';
import emailIcon from '../images/email-w.png';
import phoneIcon from '../images/phone-w.png';

export default function PersonalInformation({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
          <Text style={styles.headerText}>Thông tin cá nhân</Text>
        </View>
        <View>
          <Image style={styles.cartIcon} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.stepCont}>
          <LinearGradient
            style={styles.step}
            colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.stepText}>1</Text>
          </LinearGradient>
          <View style={styles.line} />
          <View style={styles.step2}>
            <Text style={styles.stepText}>2</Text>
          </View>
        </View>

        <View style={styles.inputCont}>
          <TextInput
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder={'Họ và Tên'}
            style={styles.textInputStyle}
            underlineColorAndroid="#e8e8e8"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            autoCompleteType="name"
          />
          <Image style={styles.iconInput} source={nameIcon} />
        </View>

        <View style={styles.inputCont}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder={'Email'}
            style={styles.textInputStyle}
            underlineColorAndroid="#e8e8e8"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <Image style={styles.iconInput} source={emailIcon} />
        </View>

        <View style={styles.inputCont}>
          <TextInput
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholder={'Số Điện Thoại'}
            style={styles.textInputStyle}
            underlineColorAndroid="#e8e8e8"
            placeholderTextColor="#b5b5b5"
            autoCapitalize="none"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Image style={styles.iconInput} source={phoneIcon} />
        </View>
      </View>

      <LinearGradient
        style={styles.btnCont}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('PAYMENT')}>
          <Text style={styles.btnText}>Thanh toán</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const {width, backgroud_color, height_header, height} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
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
  textInputStyle: {
    fontSize: width / 26,
  },
  body: {
    flex: 1,
  },
  stepCont: {
    marginVertical: height / 12,
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
  step2: {
    backgroundColor: '#e8e8e8',
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
    borderColor: '#e8e8e8',
    borderWidth: 1,
    width: width / 8,
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
    marginBottom: height / 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
