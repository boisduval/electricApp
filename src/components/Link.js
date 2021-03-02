import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as baseConstant from '../assets/baseConstant';
import * as RootNavigation from '../RootNavigation';
import PropTypes from 'prop-types';

class Link extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate(this.props.path);
        }}>
        <Text
          style={{
            fontSize: this.props.size,
            color: baseConstant.blue,
            marginHorizontal: 2,
          }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
Link.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.number,
};

Link.defaultProps = {
  size: 12,
};

export default Link;
