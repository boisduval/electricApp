/*
 * 错色面板
 * */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as baseConstant from '../assets/baseConstant';
import bicycleInfoList from '../assets/styles/bicycleInfoList';

class GradientBoard extends React.Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 0.8, y: -0.5}}
        locations={[0, 0.7, 0.7]}
        colors={[baseConstant.darkBlue, baseConstant.darkBlue, '#ccc']}
        style={{height: 90, borderRadius: 4}}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default GradientBoard;
