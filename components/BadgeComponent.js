import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Badge} from 'react-native-elements';

import cartIcon from '../images/cart-fff1dc.png';

export default function BadgeComponent({navigation}) {
  return (
    <View>
      <Image source={cartIcon} style={styles.cartIcon} />
      <Badge
        value={3}
        containerStyle={styles.containerStyle}
        badgeStyle={styles.badgeStyle}
      />
    </View>
  );
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  cartIcon: {
    width: width / 15,
    resizeMode: 'contain',
  },
  containerStyle: {
    position: 'absolute',
    top: height / 3.1,
    right: -8,
  },
  badgeStyle: {
    backgroundColor: '#FFCD61',
    borderWidth: 1,
  },
});
