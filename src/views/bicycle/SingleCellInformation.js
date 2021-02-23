import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Tab, Tabs, TabHeading} from 'native-base';
import {Header} from 'react-native-elements';

import I18n from '../../../locales';
import CellVoltage from '../../components/CellVoltage';
import CellTemperature from '../../components/CellTemperature';
import baseStyles from '../../assets/baseStyles';
import * as baseConstant from '../../assets/baseConstant';

export default class SingleCellInformation extends Component {
  render() {
    const headerList = [
      {
        name: 'cellVoltage',
        component: <CellVoltage />,
      },
      {
        name: 'cellTemperature',
        component: <CellTemperature />,
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
