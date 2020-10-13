import 'react-native-gesture-handler';
import * as React from 'react';
// import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Motorcycle from './components/Motorcycle';
import Battery from './components/Battery';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import UserScreen from './components/User';
import ScanQRCodeScreen from './components/ScanQRCode';
import * as baseConstant from './assets/baseConstant';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Home extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="扫描二维码" component={ScanQRCodeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

class HomeTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            switch (route.name) {
              case '车况':
                iconName = 'motorcycle';
                break;
              case '电量':
                iconName = 'battery';
                break;
              case '仪表':
                iconName = 'tachometer';
                break;
              case '社区':
                iconName = 'comments';
                break;
              case '我的':
                iconName = 'user';
                break;
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: baseConstant.blue,
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="车况" component={Motorcycle} />
        <Tab.Screen name="电量" component={Battery} />
        <Tab.Screen name="仪表" component={Dashboard} />
        <Tab.Screen name="社区" component={Community} />
        <Tab.Screen name="我的" component={UserScreen} />
      </Tab.Navigator>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
