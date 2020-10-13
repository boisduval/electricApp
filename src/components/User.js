import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Avatar, ListItem, Text, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import I18n from '../../locales';

import Push from './settings/Push';
import Language from './settings/Language';
import Password from './settings/Password';
import Storage from './settings/Storage';
import About from './settings/About';

const Stack = createStackNavigator();

class Home extends React.Component {
  render() {
    return (
      <View style={[baseStyles.tabViewBox]}>
        <Header
          backgroundColor="rgba(0,0,0,0)"
          placement="left"
          leftComponent={
            <Icon
              name="settings-outline"
              size={20}
              color="#666"
              onPress={() => {
                this.props.navigation.navigate(I18n.t('nav.settings'));
              }}
            />
          }
          rightComponent={
            <HeaderRight navigate={this.props.navigation.navigate} />
          }
        />
        <View
          style={[baseStyles.contentBox, {justifyContent: 'space-between'}]}>
          <View>
            <UserInfo />
            <MyService navigate={this.props.navigation.navigate} />
            <MyBicycle />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Agreements navigate={this.props.navigation.navigate} />
          </View>
        </View>
      </View>
    );
  }
}

// 设置
class Settings extends React.Component {
  render() {
    const list = [
      {
        name: I18n.t('nav.push'),
      },
      {
        name: I18n.t('nav.lang'),
      },
      {
        name: I18n.t('nav.password'),
      },
      {
        name: I18n.t('nav.storage'),
      },
      {
        name: I18n.t('nav.about'),
      },
    ];
    return (
      <View style={{marginTop: 20, justifyContent: 'space-between', flex: 1}}>
        <View>
          {list.map((v, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => {
                this.props.navigation.navigate(v.name);
              }}>
              <ListItem.Content>
                <ListItem.Title>{v.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </View>
        <Button
          title="退出登录"
          buttonStyle={{marginHorizontal: 20, marginBottom: 20}}
        />
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
          <Icon name="chatbubble-ellipses-outline" size={20} color="#666" />
        </View>
        <View style={{marginLeft: 10}}>
          <Icon
            name="scan"
            size={20}
            color="#666"
            onPress={() => {
              this.props.navigate('扫描二维码');
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
    const list = [
      {
        name: 'AF',
        subtitle: 'Vice President',
      },
    ];
    return (
      <View>
        {list.map((l, i) => (
          <ListItem key={i} containerStyle={{paddingHorizontal: 0}}>
            <Avatar
              size="medium"
              rounded
              title={l.name}
              overlayContainerStyle={{backgroundColor: '#BCBEC1'}}
            />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  }
}

// 我的服务
class MyService extends React.Component {
  render() {
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
          <Text style={[styles.headerTitle]}>我的服务</Text>
          <Text
            style={{
              color: '#666',
              fontSize: 14,
            }}
            onPress={() => {
              this.props.navigate('服务记录');
            }}>
            服务记录&ensp;
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
          <Option icon="construct-outline" text="在线报修" />
          <Option icon="book-outline" text="使用手册" />
          <Option icon="document-text-outline" text="自检手册" />
          <Option icon="location-outline" text="服务网点" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Option icon="notifications-outline" text="失窃上报" />
          <Option icon="person-outline" text="在线客服" />
          <Option />
          <Option />
        </View>
      </View>
    );
  }
}

// 服务记录
class ServiceLog extends React.Component {
  render() {
    const list = [
      {
        name: 'AF',
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        name: 'AF',
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        name: 'AF',
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        name: 'AF',
        title: '面板色差',
        time: '2020.09.20',
        content: '更换具有色差的面板，更换之后得到解决。',
      },
      {
        name: 'AF',
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
              <Avatar
                size="small"
                rounded
                title={v.name}
                overlayContainerStyle={{backgroundColor: '#BCBEC1'}}
              />
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
    );
  }
}

// 我的设备
class MyBicycle extends React.Component {
  render() {
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
        <Text style={[styles.headerTitle, {marginBottom: 10}]}>我的设备</Text>
        {list.map((v, i) => (
          <ListItem key={i} containerStyle={[styles.listItem]}>
            <ListItem.Content>
              <ListItem.Title style={{fontSize: 14}}>{v.name}</ListItem.Title>
            </ListItem.Content>
            {(() => {
              if (v.active) {
                return (
                  <Button
                    title="当前"
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
        ))}
        <Button
          type="outline"
          title="绑定神车"
          buttonStyle={[styles.listItem, {padding: 8}]}
          titleStyle={{fontSize: 14}}
          containerStyle={{borderRadius: 5}}
        />
      </View>
    );
  }
}

// 底部协议
class Agreements extends React.Component {
  render() {
    return (
      <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <Text
          style={[styles.agreements]}
          onPress={() => {
            this.props.navigate('用户协议');
          }}>
          用户协议
        </Text>
        <Text style={[styles.agreements]}>&ensp;|&ensp;</Text>
        <Text
          style={[styles.agreements]}
          onPress={() => {
            this.props.navigate('隐私政策');
          }}>
          隐私政策
        </Text>
      </View>
    );
  }
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
class User extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName={I18n.t('nav.my')}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name={I18n.t('nav.my')}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name={I18n.t('nav.settings')} component={Settings} />
        <Stack.Screen name={I18n.t('nav.push')} component={Push} />
        <Stack.Screen name={I18n.t('nav.lang')} component={Language} />
        <Stack.Screen name={I18n.t('nav.password')} component={Password} />
        <Stack.Screen name={I18n.t('nav.storage')} component={Storage} />
        <Stack.Screen name={I18n.t('nav.about')} component={About} />
        <Stack.Screen name={I18n.t('nav.serviceLog')} component={ServiceLog} />
        <Stack.Screen
          name={I18n.t('nav.agreement')}
          component={UserAgreement}
        />
        <Stack.Screen name={I18n.t('nav.privacy')} component={Privacy} />
      </Stack.Navigator>
    );
  }
}

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
