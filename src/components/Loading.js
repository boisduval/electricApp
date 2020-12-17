import {View} from 'react-native';
import {Spinner} from 'native-base';
import React from 'react';
export default function Loading() {
  return (
    <View
      style={{
        borderRadius: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: 100,
      }}>
      <Spinner color="#fff" />
    </View>
  );
}
