import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import baseUrl from '../assets/baseUrl';
import axios from '../assets/util/http';
import store from '../redux';

export default class PurchaseHistory extends React.Component {
  componentDidMount() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetVehiclePurchasing`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().currentVehicle,
        },
      })
      .then((res) => {
        const {
          data: {data},
        } = res;
        this.setState({data});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  render() {
    const list = [
      {
        label: '车辆名称',
        value: this.state.data.VName,
      },
      {
        label: '购车时间',
        value: this.state.data.VPurchasingTime,
      },
      {
        label: '质保时间',
        value: this.state.data.VWarrantyPeriod,
      },
      {
        label: '车辆编号',
        value: this.state.data.VIN,
      },
      {
        label: '电池编号',
        value: this.state.data.BatteryCode,
      },
    ];
    const img = require('../assets/img/bicycle.png');
    return (
      <View style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <View style={styles.board}>
            {list.map((v, i) => (
              <Text style={styles.text} key={i}>
                {v.label}&emsp;{v.value}
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
    backgroundColor: baseConstant.darkBlue,
    padding: 16,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 15,
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
