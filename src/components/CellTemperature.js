import React from 'react';
import {ScrollView, Text, View, StyleSheet, RefreshControl} from 'react-native';
import baseStyles from '../assets/baseStyles';
import {ListItem} from 'react-native-elements';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import I18n from '../../locales';
import Loading from '../components/Loading';
import Toast from 'react-native-root-toast';
import bicycleInfoList from '../assets/styles/bicycleInfoList';
import GradientBoard from '../components/GradientBoard';

export default class CellTemperature extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetBatterySummary`, {
        params: {
          AutoSystemID: store.getState().userId,
          BatterySystemID: store.getState().batteryId,
        },
      })
      .then((res) => {
        // res
        const {
          data: {data},
        } = res;
        this.setState({
          list: data.Status,
          DumpEnergy: data.DumpEnergy,
          ExpectsMileage: data.ExpectsMileage,
          SOC: data.SOC,
        });
        this.setState({
          refreshing: false,
        });
        if (toast) {
          setTimeout(() => {
            Toast.hide(toast);
          }, 200);
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
      DumpEnergy: '',
      ExpectsMileage: '',
      SOC: '',
      refreshing: false,
    };
  }
  render() {
    return (
      <ScrollView
        style={baseStyles.tabViewBox}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <View style={baseStyles.contentBox}>
          <GradientBoard>
            <ListItem containerStyle={bicycleInfoList.list}>
              {/*<UserAvatar size="medium" />*/}
              <ListItem.Content style={bicycleInfoList.listContent}>
                <ListItem.Title style={[bicycleInfoList.listItem]}>
                  {I18n.t('battery.remainBattery')}&emsp;{this.state.DumpEnergy}
                  Kwh
                </ListItem.Title>
                <ListItem.Title style={[bicycleInfoList.listItem]}>
                  {I18n.t('battery.estimatedMileage')}&emsp;
                  {this.state.ExpectsMileage}Km
                </ListItem.Title>
              </ListItem.Content>
              <View>
                <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
                  {this.state.SOC + '%'}
                </Text>
              </View>
            </ListItem>
          </GradientBoard>

          <View>
            {this.state.list.map((v, i) => (
              <ListItem key={i} bottomDivider>
                {/*<UserAvatar size="small" />*/}
                <ListItem.Content>
                  <ListItem.Title>{v.name}</ListItem.Title>
                  {/*<ListItem.Subtitle>{v.name}</ListItem.Subtitle>*/}
                </ListItem.Content>
                <View>
                  <Text>{v.value + v.unit}</Text>
                </View>
                {/*<ListItem.Chevron />*/}
              </ListItem>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}
