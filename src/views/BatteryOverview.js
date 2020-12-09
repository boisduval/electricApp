import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import baseStyles from '../assets/baseStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from '../components/UserAvatar';
import * as baseConstant from '../assets/baseConstant';

export default class BatteryOverview extends React.Component {
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

const styles = StyleSheet.create({
  list: {
    backgroundColor: baseConstant.blue,
    borderWidth: 0,
    borderRadius: 4,
    marginTop: 10,
  },
});
