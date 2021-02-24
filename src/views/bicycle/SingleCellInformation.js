import React, {Component} from 'react';
import {View} from 'react-native';
import {Tab, Tabs} from 'native-base';

import I18n from '../../../locales';
import CellInfo from '../../components/CellInfo';
import baseStyles from '../../assets/baseStyles';
import * as baseConstant from '../../assets/baseConstant';

export default class SingleCellInformation extends Component {
  render() {
    const headerList = [
      {
        name: 'cellVoltage',
        component: (
          <CellInfo
            url="GetSingleCellVoltageInfo"
            titleKey="MaxVoltage"
            subtitleKey="MinVoltage"
            valueKey="VoltageDifference"
            listKey="VoltageBuffer"
          />
        ),
      },
      {
        name: 'cellTemperature',
        component: (
          <CellInfo
            url="GetSingleCellTemperatureInfo"
            titleKey="MaxTemperature"
            subtitleKey="MinTemperature"
            valueKey="MOSTemperature"
            listKey="TemperatureBuffer"
          />
        ),
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
