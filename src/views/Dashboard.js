import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {MapView} from 'react-native-amap3d';
import {Card} from 'react-native-elements';
import Echarts from '../../lib/rn-echarts';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';

export default class EventsExample extends Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetInstrument`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
        },
      })
      .then((res) => {
        // res
        console.log(res);
        const {
          data: {data},
        } = res;
        this.setState({
          leftList: [
            data.BatterySOC,
            data.SingleMileage,
            data.BatteryTemperature,
          ],
          rightList: [
            data.DumpEnergy,
            data.TotalMileage,
            data.EstimatedMileage,
          ],
          centerText: data.RunningTime,
          value: data.CurrentSpeed.value,
          unit: data.CurrentSpeed.unit,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setOption(value, unit) {
    return {
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 60,
          splitNumber: 6,
          radius: '100%',
          startAngle: 210,
          endAngle: -30,
          axisLine: {
            lineStyle: {
              width: 10,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -10,
            length: 5,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 10,
            lineStyle: {
              color: '#fff',
              width: 1,
            },
          },
          axisLabel: {
            color: 'auto',
            distance: 34,
            fontSize: 14,
          },
          detail: {
            valueAnimation: true,
            formatter: `${value}${unit}`,
            color: 'auto',
            fontSize: 20,
            offsetCenter: ['0', '70%'],
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      lat: 30.2722931,
      log: 120.136559,
      points: [],
      leftList: [
        {
          name: '',
          value: '0',
          unit: '',
        },
        {
          name: '',
          value: '0',
          unit: '',
        },
        {
          name: '',
          value: '0',
          unit: '',
        },
      ],
      rightList: [
        {
          name: '',
          value: '0',
          unit: '',
        },
        {
          name: '',
          value: '0',
          unit: '',
        },
        {
          name: '',
          value: '0',
          unit: '',
        },
      ],
      centerText: {
        name: '',
        value: '0',
        unit: '',
      },
      unit: '',
      value: '0',
    };
  }

  async componentDidMount() {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    await fetch(
      'http://192.168.0.162:8086/conn/api/Vehicle/GetPositionings?AutoSystemID=1&VehicleSystemID=1&TravelAutoID=1',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          points: responseJson.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    this.getData();
  }

  _logLocationEvent = (data) => {
    if (data.latitude === '0' || data.longitude === '0') {
      return null;
    } else {
      // this.setState({
      //   lat: Number(data.latitude),
      //   log: Number(data.longitude),
      // });
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {/*<MapView*/}
        {/*  center={{*/}
        {/*    latitude: this.state.lat,*/}
        {/*    longitude: this.state.log,*/}
        {/*  }}*/}
        {/*  locationEnabled*/}
        {/*  locationInterval={10000}*/}
        {/*  distanceFilter={10}*/}
        {/*  zoomLevel={16}*/}
        {/*  onLocation={this._logLocationEvent.bind(this)}*/}
        {/*  style={{flex: 1}}>*/}
        {/*  <MapView.Polyline*/}
        {/*    width={5}*/}
        {/*    color="rgba(255, 0, 0, 0.5)"*/}
        {/*    coordinates={this.state.points}*/}
        {/*  />*/}
        {/*</MapView>*/}

        <View style={styles.board}>
          <Card>
            <View style={styles.boardBox}>
              <View style={styles.textBox}>
                {this.state.leftList.map((v, i) => (
                  <TextBox item={v} key={i} />
                ))}
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <Echarts
                  option={this.setOption(this.state.value, this.state.unit)}
                  height={130}
                  width={130}
                />
                <TextBox item={this.state.centerText} />
              </View>
              <View style={styles.textBox}>
                {this.state.rightList.map((v, i) => (
                  <TextBox item={v} key={i} />
                ))}
              </View>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

class TextBox extends React.Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.fontMedium}>{this.props.item.value}</Text>
        <Text style={styles.fontSmall}>
          {this.props.item.name + '·' + this.props.item.unit}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
  },
  boardBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 170,
  },
  textBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontMedium: {
    fontWeight: '300',
    fontSize: 18,
  },
  fontSmall: {
    fontSize: 12,
  },
});
