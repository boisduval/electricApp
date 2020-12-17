import {View} from 'react-native';
import {Spinner} from 'native-base';
import React from 'react';
export default function Loading() {
  return (
    <View
      style={{
        borderRadius: 3,
        width: 100,
        padding: 0,
        margin: 0,
      }}>
      <Spinner color="#fff" />
    </View>
  );
}
