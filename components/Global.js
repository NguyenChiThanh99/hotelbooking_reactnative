import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

module.exports = {
  backgroud_color: '#F8A170',
  width: width,
  height: height,
  height_header: height / 13,
  currencyFormat: (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  },
  validateEmail: (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  },
  link: 'http://192.168.1.41:8080/hotelbooking/',
  //link: 'http://192.168.1.25:8080/hotelbooking/',
};
