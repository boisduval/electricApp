import 'react-native-gesture-handler';
import * as React from 'react';
// import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
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
import AsyncStorage from '@react-native-community/async-storage';
import {RootSiblingParent} from 'react-native-root-siblings';

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
import Settings from './views/Settings';
import PurchaseHistory from './views/bicycle/PurchaseHistory';
import DrivingSituation from './views/bicycle/DrivingSituation';
import BatteryOverview from './views/bicycle/BatteryOverview';
import SafetyCheckup from './views/bicycle/SafetyCheckup';
import VehiclePositioning from './views/VehiclePositioning';
import HistoricalTrack from './views/bicycle/HistoricalTrack';
import VehicleHealth from './views/bicycle/VehicleHealth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  let isLoggedIn = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let status = await AsyncStorage.getItem('isLoggedIn');
        resolve(status);
      } catch (error) {
        reject(
          new Error('Error getting items from AsyncStorage: ' + error.message),
        );
      }
    });
  };
  let navList = [
    {
      name: 'main',
      title: '',
      component: HomeTabs,
      headShown: false,
    },
    {
      name: 'scan',
      title: I18n.t('nav.scan'),
      component: ScanQRCodeScreen,
    },
    {
      name: 'onlineRepair',
      title: I18n.t('nav.onlineRepair'),
      component: OnlineRepair,
    },
    {
      name: 'onlineService',
      title: I18n.t('myService.customerService'),
      component: OnlineService,
    },
    {
      name: 'manual',
      title: I18n.t('nav.manual'),
      component: Manual,
    },
    {
      name: 'settings',
      title: '',
      component: Settings,
      headShown: false,
    },
    {
      name: 'login',
      title: '',
      component: Login,
      headShown: false,
    },
    //  车况子页面
    {
      name: 'purchaseHistory',
      title: I18n.t('nav.purchaseHistory'),
      component: PurchaseHistory,
    },
    {
      name: 'drivingSituation',
      title: I18n.t('nav.drivingSituation'),
      component: DrivingSituation,
      headShown: true,
    },
    {
      name: 'batteryOverview',
      title: I18n.t('nav.batteryOverview'),
      component: BatteryOverview,
    },
    {
      name: 'safetyCheckup',
      title: I18n.t('nav.safetyCheckup'),
      component: SafetyCheckup,
    },
    // {
    //   name: 'historicalTrack',
    //   title: I18n.t('nav.historicalTrack'),
    //   component: HistoricalTrack,
    // },
    {
      name: 'vehicleHealth',
      title: I18n.t('nav.vehicleHealth'),
      component: VehicleHealth,
    },
  ];
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName={isLoggedIn ? 'main' : 'login'}>
        {navList.map((v, i) => (
          <Stack.Screen
            key={i}
            name={v.name}
            component={v.component}
            options={{headerShown: v.headShown, title: v.title}}
          />
        ))}
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
      <Tab.Screen
        name="bicycle"
        component={Motorcycle}
        options={{title: I18n.t('tab.bicycle')}}
      />
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
      <RootSiblingParent>
        <Root>
          <Provider store={store}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <PersistGate loading={null} persistor={persistor}>
              <Home />
            </PersistGate>
          </Provider>
        </Root>
      </RootSiblingParent>
    );
  }
}
