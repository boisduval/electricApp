import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import I18n from '../../locales';

import baseStyles from '../assets/baseStyles';
import PurchaseHistory from './PurchaseHistory';
import DrivingSituation from './DrivingSituation';
import BatteryOverview from './BatteryOverview';
import SafetyCheckup from './SafetyCheckup';
import VehiclePositioning from './VehiclePositioning';

import CubeItem from '../components/CubeItem';
import {Icon} from 'react-native-elements';
import useLanguageUpdate from '../hooks/userLanguageUpdate';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';

const Stack = createStackNavigator();

class Home extends Component {
  componentDidMount() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetVehicleTrafficInfo`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().currentVehicle,
        },
      })
      .then((res) => {
        console.log(res);
        const {
          data: {data},
        } = res;
        let temp = this.state.list;
        temp[2].value = data.ASingleMileage;
        temp[3].value = data.ATotalMileage;
        temp[4].value = data.StopSOC;
        temp[5].value = data.SOH;
        let temp1 = this.state.list1;
        temp1[1].subtitle =
          data.ASingleMileage + 'Km/' + data.TravelTime + 'min';
        temp1[2].subtitle = data.StopSOC + '%/' + data.SOH + '%';
        temp1[3].subtitle = data.ATotalMileage + 'Km';
        temp1[5].subtitle = data.Health + I18n.t('motorcycle.info.unit');
        this.setState({list: temp, list1: temp1});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          label: 'GPS',
          value: '',
        },
        {
          label: I18n.t('motorcycle.info.beidou'),
          value: '',
        },
        {
          label: I18n.t('motorcycle.info.singleBatteryLife'),
          value: '',
        },
        {
          label: I18n.t('motorcycle.info.totalMileage'),
          value: '',
        },
        {
          label: I18n.t('motorcycle.info.remainBattery'),
          value: '',
        },
        {
          label: I18n.t('motorcycle.info.batteryHealth'),
          value: '',
        },
      ],
      list1: [
        {
          title: I18n.t('nav.purchaseHistory'),
          subtitle: '',
          icon: 'document-text-outline',
          type: 'ionicon',
          path: 'purchaseHistory',
        },
        {
          title: I18n.t('nav.historicalTrack'),
          subtitle: '456',
          icon: 'walk-outline',
          type: 'ionicon',
          path: 'historicalTrack',
        },
        {
          title: I18n.t('nav.batteryOverview'),
          subtitle: '456',
          type: 'ionicon',
          icon: 'battery-dead-outline',
          path: 'batteryOverview',
        },
        {
          title: I18n.t('nav.drivingSituation'),
          subtitle: '456',
          icon: 'bicycle-outline',
          type: 'ionicon',
          path: 'drivingSituation',
        },
        {
          title: I18n.t('nav.safetyCheckup'),
          subtitle: '',
          icon: 'shield-checkmark-outline',
          type: 'ionicon',
          path: 'safetyCheckup',
        },
        {
          title: I18n.t('nav.vehicleHealth'),
          subtitle: '456',
          icon: 'fitness-outline',
          type: 'ionicon',
          path: 'vehicleHealth',
        },
      ],
    };
  }

  render() {
    const img = require('../assets/img/bicycle.png');
    return (
      <View style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={styles.button}>
                  <Icon name="close" />
                </View>
                <View style={styles.button}>
                  <Icon name="close" />
                </View>
              </View>
              <View style={{marginTop: 10}}>
                {this.state.list.map((v, i) => (
                  <Text key={i} style={{marginTop: 4, fontSize: 14}}>
                    {v.label} {v.value}
                  </Text>
                ))}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={img} style={{flex: 1, resizeMode: 'center'}} />
            </View>
          </View>
          <Options
            navigate={this.props.navigation.navigate}
            list={this.state.list1}
          />
        </View>
      </View>
    );
  }
}

function Options(props) {
  useLanguageUpdate();
  return (
    <View>
      <View style={styles.optionsRow}>
        {props.list.map((v, i) => (
          <View style={styles.optionSize} key={i}>
            <CubeItem
              title={v.title}
              subtitle={v.subtitle}
              icon={v.icon}
              type={v.type}
              path={v.path}
              navigate={props.navigate}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default class Motorcycle extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="motorcycle"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="motorcycle"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="purchaseHistory"
          component={PurchaseHistory}
          options={{title: I18n.t('nav.purchaseHistory')}}
        />
        <Stack.Screen
          name="drivingSituation"
          component={DrivingSituation}
          options={{title: I18n.t('nav.drivingSituation')}}
        />
        <Stack.Screen
          name="batteryOverview"
          component={BatteryOverview}
          options={{title: I18n.t('nav.batteryOverview')}}
        />
        <Stack.Screen
          name="safetyCheckup"
          component={SafetyCheckup}
          options={{title: I18n.t('nav.safetyCheckup')}}
        />
        <Stack.Screen
          name="vehiclePositioning"
          component={VehiclePositioning}
          options={{title: I18n.t('nav.vehiclePositioning')}}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionSize: {
    width: '50%',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
