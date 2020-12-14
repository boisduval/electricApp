// 设置
import useLanguageUpdate from '../hooks/userLanguageUpdate';
import I18n from '../../locales';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import * as React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Push from './settings/Push';
import Language from './settings/Language';
import Password from './settings/Password';
import Storage from './settings/Storage';
import About from './settings/About';

const Stack = createStackNavigator();

function SettingsComponent(props) {
  useLanguageUpdate();
  const list = [
    {
      name: I18n.t('nav.push'),
      route: 'push',
    },
    {
      name: I18n.t('nav.lang'),
      route: 'lang',
    },
    {
      name: I18n.t('nav.password'),
      route: 'password',
    },
    {
      name: I18n.t('nav.storage'),
      route: 'storage',
    },
    {
      name: I18n.t('nav.about'),
      route: 'about',
    },
  ];
  const logout = () => {
    AsyncStorage.removeItem('AutoSystemID');
    props.navigation.reset({
      routes: [{name: 'login'}],
    });
  };
  return (
    <View style={{marginTop: 20, justifyContent: 'space-between', flex: 1}}>
      <View>
        {list.map((v, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              props.navigation.navigate(v.route);
            }}>
            <ListItem.Content>
              <ListItem.Title>{v.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
      <Button
        title={I18n.t('logout')}
        buttonStyle={{marginHorizontal: 20, marginBottom: 20}}
        onPress={logout}
      />
    </View>
  );
}

export default function Settings() {
  useLanguageUpdate();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        options={{title: I18n.t('nav.settings')}}
        name="settings"
        component={SettingsComponent}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.push')}}
        name="push"
        component={Push}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.lang')}}
        name="lang"
        component={Language}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.password')}}
        name="password"
        component={Password}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.storage')}}
        name="storage"
        component={Storage}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.about')}}
        name="about"
        component={About}
      />
    </Stack.Navigator>
  );
}
