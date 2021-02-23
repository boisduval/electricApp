import React from 'react';
import {Text, View, StyleSheet, ScrollView, ViewComponent} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ListItem} from 'react-native-elements';

import baseStyles from '../../assets/baseStyles';
import * as baseConstant from '../../assets/baseConstant';
import I18n from '../../../locales';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import bicycleInfoList from '../../assets/styles/bicycleInfoList';
import GradientBoard from '../../components/GradientBoard';

const Tab = createMaterialTopTabNavigator();

class Week extends React.Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetTravlWeek`, {
        params: {
          AutoSystemID: store.getState().userId,
        },
      })
      .then((res) => {
        // res
        const {
          data: {data},
        } = res;
        this.setState({
          list: data.details,
          frequency: data.frequency,
          duration: data.duration,
          mileage: data.mileage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      frequency: '',
      duration: '',
      mileage: '',
    };
  }

  render() {
    return (
      <ViewBox
        frequency={this.state.frequency}
        duration={this.state.duration}
        mileage={this.state.mileage}
        list={this.state.list}
        navigate={this.props.navigation.navigate}
      />
    );
  }
}

class Month extends React.Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetTravlMonth`, {
        params: {
          AutoSystemID: store.getState().userId,
        },
      })
      .then((res) => {
        // res
        const {
          data: {data},
        } = res;
        this.setState({
          list: data.details,
          frequency: data.frequency,
          duration: data.duration,
          mileage: data.mileage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      frequency: '',
      duration: '',
      mileage: '',
    };
  }

  render() {
    return (
      <ViewBox
        frequency={this.state.frequency}
        duration={this.state.duration}
        mileage={this.state.mileage}
        list={this.state.list}
        navigate={this.props.navigation.navigate}
      />
    );
  }
}
class ViewBox extends React.Component {
  render() {
    return (
      <ScrollView style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <GradientBoard>
            <ListItem containerStyle={bicycleInfoList.list}>
              {/*<UserAvatar size="medium" />*/}
              <ListItem.Content style={bicycleInfoList.listContent}>
                <ListItem.Title style={bicycleInfoList.listItem}>
                  {I18n.t('drivingSituation.label')[0]}&emsp;
                  {this.props.frequency}
                </ListItem.Title>
                <ListItem.Title style={bicycleInfoList.listItem}>
                  {I18n.t('drivingSituation.label')[1]}&emsp;
                  {this.props.duration}
                </ListItem.Title>
              </ListItem.Content>
              <View style={{alignItems: 'center'}}>
                <Text style={[bicycleInfoList.listItem, {fontSize: 24}]}>
                  {this.props.mileage}
                </Text>
                <Text style={[bicycleInfoList.listItem, {fontSize: 20}]}>
                  km
                </Text>
              </View>
            </ListItem>
          </GradientBoard>
          <View>
            {this.props.list.map((v, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {
                  this.props.navigate('historicalTrack', {id: v.VRSystemID});
                }}>
                {/*<UserAvatar size="small" />*/}
                <ListItem.Content>
                  <ListItem.Title>{v.TraveTime}</ListItem.Title>
                  <ListItem.Subtitle>{v.VName}</ListItem.Subtitle>
                </ListItem.Content>
                <View>
                  <Text>{v.Mileage}Km</Text>
                </View>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default class DrivingSituation extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="weeklyMileageStatistics"
          component={Week}
          options={{title: I18n.t('nav.weeklyMileageStatistics')}}
        />
        <Tab.Screen
          name="monthlyMileageStatistics"
          component={Month}
          options={{title: I18n.t('nav.monthlyMileageStatistics')}}
        />
      </Tab.Navigator>
    );
  }
}
