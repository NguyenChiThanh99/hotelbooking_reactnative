import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function SignUp({navigation}) {
  return (
    <View>
      <Text>SignUp component</Text>
      <Button title="SignUp" onPress={() => navigation.navigate('MAIN')} />
    </View>
  );
}

const styles = StyleSheet.create({});
