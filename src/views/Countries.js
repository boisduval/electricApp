import React from 'react';
import {ScrollView, View} from 'react-native';
import baseStyles from '../assets/baseStyles';
import {ListItem} from 'react-native-elements';

export default function Countries({navigation, route}) {
  const list = route.params.list;
  console.log(route);
  return (
    <ScrollView style={baseStyles.tabViewBox}>
      <View style={baseStyles.contentBox}>
        {list.map((v, i) => (
          <ListItem key={i} onPress={navigation.goBack} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{v.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}
