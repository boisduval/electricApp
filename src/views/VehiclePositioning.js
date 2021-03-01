import React from 'react';
import {PermissionsAndroid, View} from 'react-native';
import {MapView} from 'react-native-amap3d';

export default class VehiclePositioning extends React.Component {
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
    return (
      <View style={{flex: 1}}>
        <MapView
          center={{
            latitude: this.state.lat,
            longitude: this.state.log,
          }}
          locationEnabled
          locationInterval={10000}
          distanceFilter={10}
          zoomLevel={16}
          onLocation={this._logLocationEvent.bind(this)}
          style={{flex: 1}}>
          <MapView.Polyline
            width={5}
            color="rgba(255, 0, 0, 0.5)"
            coordinates={this.state.points}
          />
        </MapView>
      </View>
    );
  }
}
