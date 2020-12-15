import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ListItem} from 'react-native-elements';

import baseStyles from '../../assets/baseStyles';
import * as baseConstant from '../../assets/baseConstant';
import I18n from '../../../locales';
import UserAvatar from '../../components/UserAvatar';

const Tab = createMaterialTopTabNavigator();

class Week extends React.Component {
  render() {
    const list = [
      {
        time: '2020-06-12 08:06:12',
        name: '我的V2神车',
        number: '34km',
      },
      {
        time: '2020-06-12 08:06:12',
        name: '我的V2神车',
        number: '34km',
      },
      {
        time: '2020-06-12 08:06:12',
        name: '我的V2神车',
        number: '34km',
      },
      {
        time: '2020-06-12 08:06:12',
        name: '我的V2神车',
        number: '34km',
      },
      {
        time: '2020-06-12 08:06:12',
        name: '我的V2神车',
        number: '34km',
      },
      {
        time: '2020-06-12 08:06:12',
        name: '我的V2神车',
        number: '34km',
      },
    ];
    return (
      <ScrollView style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <ListItem containerStyle={styles.list}>
            <UserAvatar size="medium" />
            <ListItem.Content>
              <ListItem.Title>123</ListItem.Title>
              <ListItem.Subtitle>456</ListItem.Subtitle>
            </ListItem.Content>
            <View>
              <Text>1234</Text>
              <Text>km</Text>
            </View>
          </ListItem>

          <View style={{marginTop: 20}}>
            {list.map((v, i) => (
              <ListItem key={i} bottomDivider>
                <UserAvatar size="small" />
                <ListItem.Content>
                  <ListItem.Title>{v.time}</ListItem.Title>
                  <ListItem.Subtitle>{v.name}</ListItem.Subtitle>
                </ListItem.Content>
                <View>
                  <Text>{v.number}</Text>
                </View>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

class Month extends React.Component {
  render() {
    return (
      <View style={baseStyles.tabViewBox}>
        <Text>123</Text>
      </View>
    );
  }
}

export default class HistoricalTrack extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="weeklyMileageStatistics"
          component={Week}
          options={{title: I18n.t('nav.weeklyMileageStatistics')}}
        />
        <Tab.Screen
          name="monthlyMileageStatistics"
          component={Month}
          options={{title: I18n.t('nav.monthlyMileageStatistics')}}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: baseConstant.blue,
    borderWidth: 0,
    borderRadius: 4,
    marginTop: 10,
  },
});
