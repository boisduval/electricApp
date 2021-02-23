import React from 'react';
import {Text, View, RefreshControl, FlatList} from 'react-native';
import baseStyles from '../../assets/baseStyles';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import I18n from '../../../locales';
import Loading from '../../components/Loading';
import Toast from 'react-native-root-toast';
import BatteryListHeader from '../../components/BatteryListHeader';
import BatteryListItem from '../../components/BatteryListItem';

export default class BatteryOverview extends React.Component {
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
        if (res.data.code === 0) {
          this.setState({
            list: data.Status,
            DumpEnergy: data.DumpEnergy,
            ExpectsMileage: data.ExpectsMileage,
            SOC: data.SOC,
          });
        } else {
          this.setState({
            list: [],
            DumpEnergy: '',
            ExpectsMileage: '',
            SOC: '',
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
    const title =
      I18n.t('battery.remainBattery') + `    ` + this.state.DumpEnergy + 'Kwh';
    const subtitle =
      I18n.t('battery.estimatedMileage') +
      `    ` +
      this.state.ExpectsMileage +
      'Km';
    const rightComponent = (
      <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
        {this.state.SOC + '%'}
      </Text>
    );
    return (
      <FlatList
        ListHeaderComponent={
          <BatteryListHeader
            title={title}
            subtitle={subtitle}
            rightComponent={rightComponent}
          />
        }
        ListFooterComponent={<View style={{height: 20}} />}
        data={this.state.list}
        renderItem={BatteryListItem}
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
