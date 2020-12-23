import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as baseConstant from '../assets/baseConstant';
import * as RootNavigation from '../RootNavigation';

export default class Link extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate(this.props.path);
        }}>
        <Text
          style={{
            fontSize: this.props.size || 12,
            color: baseConstant.blue,
            marginHorizontal: 4,
          }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
