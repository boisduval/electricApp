import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {ListItem, Text, Button} from 'react-native-elements';
import {Header, Left, Body, Right} from 'native-base';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import I18n from '../../locales';
import useLanguageUpdate from '../hooks/userLanguageUpdate';

import MyMessages from './MyMessages';
import UserAvatar from '../components/UserAvatar';
import PurchaseHistory from './bicycle/PurchaseHistory';

const Stack = createStackNavigator();

class Home extends React.Component {
  render() {
    return (
      <View style={[baseStyles.tabViewBox]}>
        <Header style={{backgroundColor: '#fff'}} androidStatusBarColor="#fff">
          <StatusBar barStyle="dark-content" />
          <Left>
            <Icon
              name="settings-outline"
              size={20}
              color="#666"
              onPress={() => {
                this.props.navigation.navigate('settings');
              }}
            />
          </Left>
          <Body />
          <Right>
            <HeaderRight navigate={this.props.navigation.navigate} />
          </Right>
        </Header>
        <ScrollView>
          <View style={[baseStyles.contentBox]}>
            <View>
              <UserInfo information={this.props.userInformation} />
              <MyService navigate={this.props.navigation.navigate} />
              <MyBicycle navigate={this.props.navigation.navigate} />
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Agreements navigate={this.props.navigation.navigate} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// 头部右
class HeaderRight extends React.Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View>
          <Icon
            name="chatbubble-ellipses-outline"
            size={20}
            color="#666"
            onPress={() => {
              this.props.navigate('message');
            }}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Icon
            name="scan"
            size={20}
            color="#666"
            onPress={() => {
              this.props.navigate('scan');
            }}
          />
          {/*</Button>*/}
        </View>
      </View>
    );
  }
}

// 用户资料
class UserInfo extends React.Component {
  render() {
    return (
      <View>
        <ListItem containerStyle={{paddingHorizontal: 0}}>
          <UserAvatar />
          <ListItem.Content>
            <ListItem.Title>{this.props.information.username}</ListItem.Title>
            <ListItem.Subtitle>
              {this.props.information.signature}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  }
}

// 我的服务
function MyService(props) {
  useLanguageUpdate();
  return (
    <View>
      {/*头部*/}
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
          marginVertical: 10,
        }}>
        <Text style={[styles.headerTitle]}>{I18n.t('myService.title')}</Text>
        <Text
          style={{
            color: '#666',
            fontSize: 14,
          }}
          onPress={() => {
            props.navigate('serviceLog');
          }}>
          {I18n.t('myService.log')}&ensp;
          <FontAwesome name="angle-right" size={16} />
        </Text>
      </View>
      {/*options*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Option
          icon="construct-outline"
          text={I18n.t('myService.repair')}
          navigate={props.navigate}
          path="onlineRepair"
        />
        <Option
          icon="book-outline"
          text={I18n.t('myService.instruction')}
          navigate={props.navigate}
          path="manual"
        />
        <Option
          icon="document-text-outline"
          text={I18n.t('myService.selfCheck')}
        />
        <Option icon="location-outline" text={I18n.t('myService.place')} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Option
          icon="notifications-outline"
          text={I18n.t('myService.report')}
        />
        <Option
          icon="person-outline"
          text={I18n.t('myService.customerService')}
          navigate={props.navigate}
          path="onlineService"
        />
        <Option />
        <Option />
      </View>
    </View>
  );
}

// 服务记录
class ServiceLog extends React.Component {
  render() {
    const list = [
      {
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
    ];
    return (
      <ScrollView>
        <View style={[baseStyles.contentBox, {marginVertical: 10}]}>
          {list.map((v, i) => (
            <ListItem key={i} containerStyle={{borderRadius: 5, marginTop: 10}}>
              <UserAvatar size="small" />
              <ListItem.Content>
                <ListItem.Title style={{fontSize: 14}}>
                  {v.title}&ensp;
                  <Text style={{fontSize: 12, color: '#8f8f8f'}}>{v.time}</Text>
                </ListItem.Title>
                {/*<ListItem.Subtitle style={{fontSize: 12}}>*/}
                {/*  {v.time}*/}
                {/*</ListItem.Subtitle>*/}
                <View
                  style={{
                    backgroundColor: '#ececec',
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#a5a5a5', fontSize: 12}}>
                    {v.content}
                  </Text>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    );
  }
}

// 服务选项组件
class Option extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigate(this.props.path);
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon name={this.props.icon} color="#666" size={38} />
          <Text style={{fontSize: 12, color: '#666'}}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// 我的设备
function MyBicycle(props) {
  useLanguageUpdate();
  const list = [
    {
      name: '我的V3神车',
      active: true,
    },
    {
      name: '我的V2神车',
      active: false,
    },
  ];
  return (
    <View style={{marginTop: 30}}>
      <Text style={[styles.headerTitle, {marginBottom: 10}]}>
        {I18n.t('myDevice.title')}
      </Text>
      {list.map((v, i) => (
        <TouchableOpacity
          onPress={() => {
            props.navigate('purchaseHistory', {id: '123'});
          }}
          key={i}>
          <ListItem containerStyle={[styles.listItem]}>
            <ListItem.Content>
              <ListItem.Title style={{fontSize: 14}}>{v.name}</ListItem.Title>
            </ListItem.Content>
            {(() => {
              if (v.active) {
                return (
                  <Button
                    title={I18n.t('myDevice.current')}
                    type="outline"
                    disabled
                    disabledTitleStyle={{
                      color: baseConstant.blue,
                      fontSize: 10,
                    }}
                    disabledStyle={{
                      borderColor: baseConstant.blue,
                      paddingVertical: 0,
                    }}
                  />
                );
              }
            })()}
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      ))}
      <Button
        type="outline"
        title={I18n.t('myDevice.button')}
        buttonStyle={[styles.listItem, {padding: 8}]}
        titleStyle={{fontSize: 14}}
        containerStyle={{borderRadius: 5}}
      />
    </View>
  );
}

// 底部协议
function Agreements(props) {
  useLanguageUpdate();
  return (
    <View style={{marginBottom: 10, flexDirection: 'row'}}>
      <Text
        style={[styles.agreements]}
        onPress={() => {
          props.navigate('agreement');
        }}>
        {I18n.t('nav.agreement')}
      </Text>
      <Text style={[styles.agreements]}>&ensp;|&ensp;</Text>
      <Text
        style={[styles.agreements]}
        onPress={() => {
          props.navigate('privacy');
        }}>
        {I18n.t('nav.privacy')}
      </Text>
    </View>
  );
}

// 用户协议
class UserAgreement extends React.Component {
  render() {
    return <Text>用户协议</Text>;
  }
}

// 隐私政策
class Privacy extends React.Component {
  render() {
    return <Text>隐私政策</Text>;
  }
}

// 导航
function User() {
  useLanguageUpdate();
  return (
    <Stack.Navigator
      initialRouteName="mine"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="mine"
        component={ReduxHome}
        options={{headerShown: false, title: I18n.t('nav.mine')}}
      />

      <Stack.Screen
        options={{title: I18n.t('nav.serviceLog')}}
        name="serviceLog"
        component={ServiceLog}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.agreement')}}
        name="agreement"
        component={UserAgreement}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.privacy')}}
        name="privacy"
        component={Privacy}
      />
      <Stack.Screen
        options={{title: I18n.t('nav.message')}}
        name="message"
        component={MyMessages}
      />
      <Stack.Screen
        name="purchaseHistory"
        component={PurchaseHistory}
        options={{title: I18n.t('nav.purchaseHistory')}}
      />
      {/*<Stack.Screen*/}
      {/*  options={{title: I18n.t('nav.onlineRepair')}}*/}
      {/*  name="onlineRepair"*/}
      {/*  component={OnlineRepair}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  options={{title: I18n.t('myService.customerService')}}*/}
      {/*  name="onlineService"*/}
      {/*  component={OnlineService}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  const {userInformation} = state;
  return {userInformation};
};

const mapDispatchToProps = (dispatch) => ({
  setUserInformation: (setUserInformationAction) =>
    dispatch(setUserInformationAction),
});

const ReduxHome = connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  agreements: {
    color: baseConstant.blue,
    fontSize: 12,
  },
});

export default User;
