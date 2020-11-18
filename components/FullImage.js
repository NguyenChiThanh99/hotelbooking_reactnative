import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from './Global';

import backIcon from '../images/chevron-left-fff1dc.png';

export default function FullImage({route, navigation}) {
  const {img} = route.params;

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <LinearGradient
        style={styles.headerContainer}
        colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </LinearGradient>

      <Image source={{uri: img}} style={styles.img} />
    </View>
  );
}

const {width, backgroud_color, height_header} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    backgroundColor: backgroud_color,
    height: height_header,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    flex: 1,
    resizeMode: 'contain',
  },
  exit: {
    width: width / 5,
    height: width / 5,
  },
  backIcon: {
    width: width / 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
