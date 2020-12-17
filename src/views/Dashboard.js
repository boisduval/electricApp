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

export default class EventsExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 30.2722931,
      log: 120.136559,
      points: [],
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
    const leftList = [
      {
        name: '电池健康·%',
        value: '99.9',
      },
      {
        name: '电池健康·%',
        value: '99.9',
      },
      {
        name: '电池健康·%',
        value: '99.9',
      },
    ];
    const rightList = [
      {
        name: '电池健康·%',
        value: '99.9',
      },
      {
        name: '电池健康·%',
        value: '99.9',
      },
      {
        name: '电池健康·%',
        value: '99.9',
      },
    ];
    const centerText = {
      name: '电池健康·%',
      value: '99.9',
    };
    const option = {
      series: [
        {
          type: 'gauge',
          radius: '90%',
          splitNumber: 8,
          min: 0,
          max: 80,
          progress: {
            show: true,
            width: 8,
          },
          axisLine: {
            lineStyle: {
              width: 8,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 4,
            lineStyle: {
              width: 2,
              color: '#999',
            },
            distance: 2,
          },
          axisLabel: {
            distance: 10,
            color: '#999',
            fontSize: 10,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 10,
            itemStyle: {
              borderWidth: 4,
            },
          },
          pointer: {
            length: '50%',
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            offsetCenter: [0, '70%'],
          },
          data: [
            {
              value: 70,
            },
          ],
        },
      ],
    };
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
                {leftList.map((v, i) => (
                  <TextBox item={v} key={i} />
                ))}
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <Echarts option={option} height={130} width={130} />
                <TextBox item={centerText} />
              </View>
              <View style={styles.textBox}>
                {rightList.map((v, i) => (
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
        <Text style={styles.fontSmall}>{this.props.item.name}</Text>
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
