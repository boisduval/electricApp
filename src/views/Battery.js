import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Tab, Tabs, TabHeading} from 'native-base';
import {Header} from 'react-native-elements';

import I18n from '../../locales/index';
import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';

import PowerConsumption from '../components/PowerConsumption';
import ChargeAndDischarge from '../components/ChargeAndDischarge';

export default class Battery extends Component {
  render() {
    const headerList = [
      {
        name: 'powerConsumption',
        component: <PowerConsumption />,
      },
      {
        name: 'chargeAndDischarge',
        component: <ChargeAndDischarge />,
      },
    ];
    return (
      <View style={[baseStyles.tabViewBox]}>
        {/*<Header*/}
        {/*  centerComponent={{*/}
        {/*    text: I18n.t('tab.battery'),*/}
        {/*    style: {color: baseConstant.blue, fontWeight: 'bold', fontSize: 16},*/}
        {/*  }}*/}
        {/*  containerStyle={{*/}
        {/*    backgroundColor: '#fff',*/}
        {/*    justifyContent: 'space-around',*/}
        {/*  }}*/}
        {/*/>*/}
        <Tabs tabBarUnderlineStyle={{backgroundColor: baseConstant.blue}}>
          {headerList.map((v, i) => (
            <Tab
              key={i}
              tabStyle={{backgroundColor: '#fff'}}
              activeTabStyle={{backgroundColor: '#fff'}}
              textStyle={{color: '#666'}}
              activeTextStyle={{color: 'black'}}
              heading={I18n.t('tab.' + v.name)}>
              {v.component}
            </Tab>
          ))}
        </Tabs>
      </View>
    );
  }
}
