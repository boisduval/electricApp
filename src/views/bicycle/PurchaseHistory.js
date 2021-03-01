import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import baseStyles from '../../assets/baseStyles';
import * as baseConstant from '../../assets/baseConstant';
import baseUrl from '../../assets/baseUrl';
import axios from '../../assets/util/http';
import store from '../../redux';
import I18n from '../../../locales';
import ImageItem from '../../components/ImageItem';

export default class PurchaseHistory extends React.Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetVehiclePurchasing`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
        },
      })
      .then((res) => {
        if (res) {
          const {
            data: {data},
          } = res;
          this.setState({data, img: data.Img});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getData();
  }
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      img: '',
    };
  }
  render() {
    const list = [
      {
        label: I18n.t('purchaseHistory.vehicleName'),
        value: this.state.data.VName,
      },
      {
        label: I18n.t('purchaseHistory.carTime'),
        value: this.state.data.VPurchasingTime,
      },
      {
        label: I18n.t('purchaseHistory.warrantyTime'),
        value: this.state.data.VWarrantyPeriod,
      },
      {
        label: I18n.t('purchaseHistory.vehicleNumber'),
        value: this.state.data.VIN,
      },
      {
        label: I18n.t('purchaseHistory.batteryNumber'),
        value: this.state.data.BatteryCode,
      },
    ];
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
            <ImageItem
              uri={this.state.img}
              resizeMode="contain"
              width={undefined}
              height={undefined}
            />
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
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
