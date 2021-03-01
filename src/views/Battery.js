import React, {Component} from 'react';
import {View} from 'react-native';
import {Tab, Tabs} from 'native-base';

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
