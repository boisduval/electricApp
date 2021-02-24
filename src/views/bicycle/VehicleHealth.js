import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import baseStyles from '../../assets/baseStyles';
import {ListItem} from 'react-native-elements';
import I18n from '../../../locales';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import Toast from 'react-native-root-toast';
import Loading from '../../components/Loading';
import bicycleInfoList from '../../assets/styles/bicycleInfoList';
import BatteryListHeader from '../../components/BatteryListHeader';

export default class VehicleHealth extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetVehicleHealth`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
        },
      })
      .then((res) => {
        // res
        console.log(res);
        const {
          data: {data},
        } = res;
        this.setState({
          list: data.Items,
          VWarrantyPeriod: data.VWarrantyPeriod,
          VPurchasingTime: data.VPurchasingTime,
          Conclusion: data.Conclusion,
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
      VWarrantyPeriod: '',
      VPurchasingTime: '',
      Conclusion: '',
      refreshing: false,
    };
  }

  render() {
    const title =
      I18n.t('vehicleHealth')[0] + `    ` + this.state.VPurchasingTime;
    const subtitle =
      I18n.t('vehicleHealth')[1] + `    ` + this.state.VWarrantyPeriod;
    const rightComponent = (
      <Text style={[bicycleInfoList.listItem, {fontSize: 24}]}>
        {this.state.Conclusion}
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
        renderItem={({item}) => (
          <ListItem bottomDivider>
            {/*<UserAvatar size="small" />*/}
            <ListItem.Content>
              <ListItem.Title>{item.Title}</ListItem.Title>
              <ListItem.Subtitle>{item.LastTime}</ListItem.Subtitle>
            </ListItem.Content>
            <View>
              <Text style={{fontSize: 16}}>{item.Interval}</Text>
            </View>
            {/*<ListItem.Chevron />*/}
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
