import 'react-native-gesture-handler';
import * as React from 'react';
// import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux';
import {persistor} from './redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Root} from 'native-base';

import Login from './views/Login';
import Motorcycle from './views/Motorcycle';
import Battery from './views/Battery';
import Dashboard from './views/Dashboard';
import Community from './views/Community';
import UserScreen from './views/User';
import ScanQRCodeScreen from './components/ScanQRCode';
import * as baseConstant from './assets/baseConstant';
import I18n from '../locales';
import useLanguageUpdate from './hooks/userLanguageUpdate';
import {StatusBar} from 'react-native';
import OnlineRepair from './views/service/OnlineRepair';
import Manual from './views/service/Manual';
import OnlineService from './views/service/OnlineService';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{title: '扫描二维码'}}
          name="scan"
          component={ScanQRCodeScreen}
        />
        <Stack.Screen
          options={{title: I18n.t('nav.onlineRepair')}}
          name="onlineRepair"
          component={OnlineRepair}
        />
        <Stack.Screen
          options={{title: I18n.t('myService.customerService')}}
          name="onlineService"
          component={OnlineService}
        />
        <Stack.Screen
          options={{title: I18n.t('nav.manual')}}
          name="manual"
          component={Manual}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  useLanguageUpdate();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'bicycle':
              iconName = 'motorcycle';
              break;
            case 'battery':
              iconName = 'battery';
              break;
            case 'dashboard':
              iconName = 'tachometer';
              break;
            case 'communication':
              iconName = 'comments';
              break;
            case 'mine':
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
      <Tab.Screen name="bicycle" component={Motorcycle} />
      <Tab.Screen
        options={{
          title: I18n.t('tab.battery'),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="battery"
        component={Battery}
      />
      <Tab.Screen
        options={{title: I18n.t('tab.dashboard')}}
        name="dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{title: I18n.t('tab.communication')}}
        name="communication"
        component={Community}
      />
      <Tab.Screen
        options={{title: I18n.t('tab.mine')}}
        name="mine"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <PersistGate loading={null} persistor={persistor}>
            <Home />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
