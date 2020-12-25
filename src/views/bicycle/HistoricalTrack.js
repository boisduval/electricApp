import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {MapView} from 'react-native-amap3d';
import {Card, Icon, ListItem} from 'react-native-elements';
import Echarts from '../../../lib/rn-echarts';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import I18n from '../../../locales';
import * as baseConstant from '../../assets/baseConstant';

export default class HistoricalTrack extends Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetPositionings`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
          TravelAutoID: this.props.route.params.id,
        },
      })
      .then((res) => {
        // res
        console.log(res);
        const {
          data: {data},
        } = res;
        this.setState({
          points: data,
          lat: Number(data[0].latitude),
          log: Number(data[0].longitude),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      lat: 39.91095,
      log: 116.37296,
      points: [],
    };
  }

  async componentDidMount() {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
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
        <MapView
          center={{
            latitude: Number(this.state.lat),
            longitude: Number(this.state.log),
          }}
          zoomLevel={17}
          style={{flex: 1}}>
          <MapView.Polyline
            width={5}
            color="rgba(255, 0, 0, 0.5)"
            coordinates={this.state.points}
          />
          <MapView.Marker
            coordinate={this.state.points[this.state.points.length - 1]}
            icon={() => (
              <View style={styles.customMarker}>
                <Text style={styles.markerText}>终</Text>
              </View>
            )}
          />
          <MapView.Marker
            coordinate={this.state.points[0]}
            icon={() => (
              <View style={[styles.customMarker, styles.greenMarker]}>
                <Text style={styles.markerText}>始</Text>
              </View>
            )}
          />
        </MapView>

        {/*  <View style={styles.board}>*/}
        {/*    <Card>*/}
        {/*      <ListItem containerStyle={styles.boardBox}>*/}
        {/*        <ListItem.Content>*/}
        {/*          <ListItem.Title>*/}
        {/*            {I18n.t('historicalTrack.text')}*/}
        {/*          </ListItem.Title>*/}
        {/*          <ListItem.Subtitle>*/}
        {/*            {this.state.points.length !== 0*/}
        {/*              ? this.state.points[this.state.points.length - 1].writetime*/}
        {/*              : ''}*/}
        {/*          </ListItem.Subtitle>*/}
        {/*        </ListItem.Content>*/}
        {/*        <TouchableOpacity*/}
        {/*          onPress={() => {*/}
        {/*            this.getData();*/}
        {/*          }}>*/}
        {/*          <Icon name={'refresh'} size={50} color={baseConstant.blue} />*/}
        {/*        </TouchableOpacity>*/}
        {/*      </ListItem>*/}
        {/*    </Card>*/}
        {/*  </View>*/}
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: 10,
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
  customMarker: {
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    width: 20,
  },
  greenMarker: {
    backgroundColor: 'green',
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
    height: 20,
    lineHeight: 20,
    color: '#fff',
  },
});
