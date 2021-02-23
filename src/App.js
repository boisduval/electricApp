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
import {connect, Provider} from 'react-redux';
import store from './redux';
import {persistor} from './redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Root} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {RootSiblingParent} from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';

// import Login from './views/Login';
import Login from './views/login/Login';
import Motorcycle from './views/Motorcycle';
import Battery from './views/Battery';
import Dashboard from './views/Dashboard';
import Community from './views/Community';
import UserScreen from './views/User';
import ScanQRCodeScreen from './components/ScanQRCode';
import * as baseConstant from './assets/baseConstant';
import I18n from '../locales';
import useLanguageUpdate from './hooks/userLanguageUpdate';
import {StatusBar, Text, View} from 'react-native';

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
import Agreement from './views/Agreement';
import Privacy from './views/Privacy';
import RetrievePassword from './views/RetrievePassword';
import Countries from './views/Countries';
import LoadingScreen from './views/LoadingScreen';
import AccountNumber from './views/login/AccountNumber';
import PhoneNumber from './views/login/PhoneNumber';
import Search from './views/Search';
import BlogDetail from './views/BlogDetail';
import SingleCellInformation from './views/bicycle/SingleCellInformation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// let isLoggedIn;
// async function getData() {
//   return await AsyncStorage.getItem('isLoggedIn');
// }
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      isLoading: true,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('userId')
      .then((res) => {
        this.setState({
          isLoggedIn: res,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
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
      {
        name: 'historicalTrack',
        title: I18n.t('nav.historicalTrack'),
        component: HistoricalTrack,
      },
      {
        name: 'vehicleHealth',
        title: I18n.t('nav.vehicleHealth'),
        component: VehicleHealth,
      },
      //  协议
      {
        name: 'agreement',
        title: I18n.t('nav.agreement'),
        component: Agreement,
      },
      {
        name: 'privacy',
        title: I18n.t('nav.privacy'),
        component: Privacy,
      },
      {
        name: 'retrievePassword',
        title: I18n.t('nav.retrievePassword'),
        component: RetrievePassword,
      },
      {
        name: 'countries',
        title: '',
        component: Countries,
        headShown: false,
      },
      {
        name: 'search',
        title: '',
        component: Search,
        headShown: false,
      },
      {
        name: 'blogDetail',
        title: I18n.t('nav.blogDetail'),
        component: BlogDetail,
      },
      {
        name: 'singleCellInformation',
        title: I18n.t('nav.singleCellInformation'),
        component: SingleCellInformation,
      },
    ];
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          {this.state.isLoading ? (
            <Stack.Screen
              name="splash"
              component={LoadingScreen}
              options={{headerShown: false}}
            />
          ) : this.props.userId !== '' ? (
            <>
              {navList.map((v, i) => (
                <Stack.Screen
                  key={i}
                  name={v.name}
                  component={v.component}
                  options={{headerShown: v.headShown, title: v.title}}
                />
              ))}
            </>
          ) : (
            <>
              <Stack.Screen
                name="login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="accountNumber"
                component={AccountNumber}
                options={{
                  title: '',
                  headerStyle: {elevation: 0},
                }}
              />
              <Stack.Screen
                name="phoneNumber"
                component={PhoneNumber}
                options={{
                  title: '',
                  headerStyle: {elevation: 0},
                }}
              />
              <Stack.Screen
                name="countries"
                component={Countries}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="agreement"
                component={Agreement}
                options={{title: I18n.t('nav.agreement')}}
              />
              <Stack.Screen
                name="privacy"
                component={Privacy}
                options={{title: I18n.t('nav.privacy')}}
              />
              <Stack.Screen
                name="retrievePassword"
                component={RetrievePassword}
                options={{title: I18n.t('nav.retrievePassword')}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const {userId, currentVehicle, batteryId} = state;
  return {userId, currentVehicle, batteryId};
};

const mapDispatchToProps = (dispatch) => ({
  setStoreState: (setUserIdAction) => dispatch(setUserIdAction),
});

const HomePage = connect(mapStateToProps, mapDispatchToProps)(Home);

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
  componentDidMount() {
    SplashScreen.hide();
    // console.log(Splash);
  }

  render() {
    return (
      // RootSiblingParent显示Toast
      <RootSiblingParent>
        {/*//   <Root>*/}
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <PersistGate loading={null} persistor={persistor}>
            <HomePage />
          </PersistGate>
        </Provider>
        {/*//   </Root>*/}
      </RootSiblingParent>
    );
  }
}
