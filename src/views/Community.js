import React, {Component} from 'react';
import {Text, View} from 'react-native';

import baseStyles from '../assets/baseStyles';
import {Container, Content, Tab, Tabs} from 'native-base';
import {Icon, ListItem} from 'react-native-elements';
import UserAvatar from '../components/UserAvatar';
import * as baseConstant from '../assets/baseConstant';
import I18n from '../../locales';
import Recommend from '../components/community/Recommend';
import RidingRecords from '../components/community/RidingRecords';

const headerList = [
  {
    name: 'recommend',
    component: <Recommend />,
  },
  {
    name: 'ridingRecords',
    component: <RidingRecords />,
  },
  {
    name: 'remould',
    component: <Recommend />,
  },
  {
    name: 'classRoom',
    component: <Recommend />,
  },
  {
    name: 'announcement',
    component: <Recommend />,
  },
];

export default class Community extends Component {
  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <HeaderComponent navigate={this.props.navigation.navigate} />
          <Tabs tabBarUnderlineStyle={{backgroundColor: baseConstant.blue}}>
            {headerList.map((v, i) => (
              <Tab
                key={i}
                tabStyle={{backgroundColor: '#fff'}}
                activeTabStyle={{backgroundColor: '#fff'}}
                textStyle={{color: '#666'}}
                activeTextStyle={{color: 'black'}}
                heading={I18n.t('community.' + v.name)}>
                {v.component}
              </Tab>
            ))}
          </Tabs>
        </View>
      </Container>
    );
  }
}

// 头部
class HeaderComponent extends React.Component {
  render() {
    return (
      <ListItem>
        <UserAvatar size="small" />
        <ListItem.Content>
          <ListItem.Title>123</ListItem.Title>
          <ListItem.Subtitle>123</ListItem.Subtitle>
        </ListItem.Content>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="search"
            type="ionicon"
            color="#666"
            iconStyle={{marginRight: 10}}
            size={24}
            onPress={() => {
              this.props.navigate('search');
            }}
          />
          <Icon
            name="add-circle-outline"
            color="#666"
            type={'ionicon'}
            size={24}
          />
        </View>
      </ListItem>
    );
  }
}
