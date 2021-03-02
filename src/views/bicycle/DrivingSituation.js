import React from 'react';
import {Text, View, RefreshControl, FlatList} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ListItem} from 'react-native-elements';

import * as RootNavigation from '../../RootNavigation';

import baseStyles from '../../assets/baseStyles';
import I18n from '../../../locales';
import axios from '../../assets/utils/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import bicycleInfoList from '../../assets/styles/bicycleInfoList';
import BatteryListHeader from '../../components/BatteryListHeader';
import Toast from 'react-native-root-toast';
import Loading from '../../components/Loading';

const Tab = createMaterialTopTabNavigator();

class Week extends React.Component {
  render() {
    return <ViewBox url="GetTravlWeek" />;
  }
}

class Month extends React.Component {
  render() {
    return <ViewBox url="GetTravlMonth" />;
  }
}
class ViewBox extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/${this.props.url}`, {
        params: {
          AutoSystemID: store.getState().userId,
        },
      })
      .then((res) => {
        // res
        if (res) {
          const {
            data: {data},
          } = res;
          if (res.data.code === 0) {
            this.setState({
              list: data.details,
              frequency: data.frequency,
              duration: data.duration,
              mileage: data.mileage,
            });
          } else {
            this.setState({
              list: [],
              frequency: '',
              duration: '',
              mileage: '',
            });
          }
          this.setState({
            refreshing: false,
          });
          if (toast) {
            setTimeout(() => {
              Toast.hide(toast);
            }, 200);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onRefresh() {
    if (this.state.refreshing === false) {
      this.setState({
        refreshing: true,
      });
      let toast = Toast.show(Loading(), {
        position: Toast.positions.CENTER, // toast位置
      });
      this.getData(toast);
    }
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
      refreshing: false,
    };
  }
  render() {
    const title =
      I18n.t('drivingSituation.label')[0] + `    ` + this.state.frequency;
    const subtitle =
      I18n.t('drivingSituation.label')[1] + `    ` + this.state.duration;
    const rightComponent = (
      <View style={{alignItems: 'flex-end'}}>
        <Text style={[bicycleInfoList.listItem, {fontSize: 24}]}>
          {this.state.mileage}
        </Text>
        <Text style={[bicycleInfoList.listItem, {fontSize: 20}]}>km</Text>
      </View>
    );
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <BatteryListHeader
            title={title}
            subtitle={subtitle}
            rightComponent={rightComponent}
          />
        }
        ListFooterComponent={<View style={{height: 20}} />}
        data={this.state.list}
        renderItem={({item}) => (
          <ListItem
            bottomDivider
            onPress={() => {
              RootNavigation.navigate('historicalTrack', {id: item.VRSystemID});
            }}>
            <ListItem.Content>
              <ListItem.Title>{item.TraveTime}</ListItem.Title>
              <ListItem.Subtitle>{item.VName}</ListItem.Subtitle>
            </ListItem.Content>
            <View>
              <Text>{item.Mileage}Km</Text>
            </View>
            <ListItem.Chevron />
          </ListItem>
        )}
        style={[baseStyles.tabViewBox, {paddingHorizontal: 10, marginTop: 10}]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
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
