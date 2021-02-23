/*
 * 提取列表项组件
 * */
import React from 'react';
import {ListItem} from 'react-native-elements';
import {Text, View} from 'react-native';

const BatteryListItem = ({item}) => (
  <ListItem bottomDivider>
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
    </ListItem.Content>
    <View>
      <Text>{item.value + item.unit}</Text>
    </View>
  </ListItem>
);

export default BatteryListItem;
