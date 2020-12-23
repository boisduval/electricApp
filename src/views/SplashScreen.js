import React from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';
import * as baseConstant from '../assets/baseConstant';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View
        style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center'}}>
        <View style={{height: 100, width: '100%'}}>
          <Spinner color={baseConstant.blue} />
        </View>
      </View>
    );
  }
}
