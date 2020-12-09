import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import I18n from '../../locales';

import baseStyles from '../assets/baseStyles';
import PurchaseHistory from './PurchaseHistory';
import DrivingSituation from './DrivingSituation';
import BatteryOverview from './BatteryOverview';
import SafetyCheckup from './SafetyCheckup';
import VehiclePositioning from './VehiclePositioning';

import CubeItem from '../components/CubeItem';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();

class Home extends Component {
  render() {
    const img = require('../assets/img/bicycle.png');
    const list = [
      'GPS *****',
      '北斗 *******',
      '单次续航 88KM',
      '总共里程 8124 KM',
      '剩余电量 56 %',
      '电池健康 99.9 %',
    ];
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
                {list.map((v, i) => (
                  <Text key={i} style={{marginTop: 4, fontSize: 14}}>
                    {v}
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
          <Options navigate={this.props.navigation.navigate} />
        </View>
      </View>
    );
  }
}

class Options extends React.Component {
  render() {
    const list = [
      {
        title: I18n.t('nav.purchaseHistory'),
        subtitle: '456',
        icon: 'home',
        path: 'purchaseHistory',
      },
      {
        title: I18n.t('nav.drivingSituation'),
        subtitle: '456',
        icon: 'home',
        path: 'drivingSituation',
      },
      {
        title: I18n.t('nav.batteryOverview'),
        subtitle: '456',
        icon: 'home',
        path: 'batteryOverview',
      },
      {
        title: I18n.t('nav.safetyCheckup'),
        subtitle: '456',
        icon: 'home',
        path: 'safetyCheckup',
      },
    ];
    return (
      <View>
        <View style={styles.optionsRow}>
          {list.map((v, i) => (
            <View style={styles.optionSize} key={i}>
              <CubeItem
                title={v.title}
                subtitle={v.subtitle}
                icon={v.icon}
                path={v.path}
                navigate={this.props.navigate}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }
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
