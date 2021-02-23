/*
 * 提取错色模块组件
 * */

import React from 'react';
import {ListItem} from 'react-native-elements';
import bicycleInfoList from '../assets/styles/bicycleInfoList';
import {Text, View} from 'react-native';
import GradientBoard from './GradientBoard';
import PropTypes from 'prop-types';

class BatteryListHeader extends React.Component {
  render() {
    return (
      <GradientBoard>
        <ListItem containerStyle={bicycleInfoList.list}>
          <ListItem.Content style={bicycleInfoList.listContent}>
            <ListItem.Title style={[bicycleInfoList.listItem]}>
              {this.props.title}
            </ListItem.Title>
            <ListItem.Title style={[bicycleInfoList.listItem]}>
              {this.props.subtitle}
            </ListItem.Title>
          </ListItem.Content>
          <View>{this.props.rightComponent}</View>
        </ListItem>
      </GradientBoard>
    );
  }
}

BatteryListHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  rightComponent: PropTypes.element,
};

export default BatteryListHeader;
