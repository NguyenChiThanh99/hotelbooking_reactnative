import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function LogIn({navigation}) {
  return (
    <View>
      <Text>Login component</Text>
      <Button title="SignIn" onPress={() => navigation.navigate('MAIN')} />
      <Button title="SignUp" onPress={() => navigation.navigate('SIGNUP')} />
    </View>
  );
}

const styles = StyleSheet.create({});
