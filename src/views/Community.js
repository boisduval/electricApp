import React, {Component} from 'react';
import {Text, View} from 'react-native';

import baseStyles from '../assets/baseStyles';

export default class Community extends Component {
  render() {
    return (
      <View style={[baseStyles.tabViewBox]}>
        <Text>Community!</Text>
      </View>
    );
  }
}