import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';

export default class PurchaseHistory extends React.Component {
  render() {
    const list = [
      '客户姓名  方XX',
      '购车时间  2020-01-16',
      '质保时间  2023-01-17',
      '车辆编号  HCEBV1523682CE216',
      '电池编号  BMS12345678912345',
    ];
    const img = require('../assets/img/bicycle.png');
    return (
      <View style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <View style={styles.board}>
            {list.map((v, i) => (
              <Text style={styles.text} key={i}>
                {v}
              </Text>
            ))}
          </View>
          <View style={styles.bicycle}>
            <Image source={img} style={styles.img} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    borderRadius: 8,
    backgroundColor: baseConstant.blue,
    padding: 16,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  bicycle: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  img: {
    flex: 1,
    resizeMode: 'contain',
  },
});
