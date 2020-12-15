import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import baseStyles from '../../assets/baseStyles';
import {ListItem} from 'react-native-elements';
import * as baseConstant from '../../assets/baseConstant';
import I18n from '../../../locales';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';

export default class VehicleHealth extends React.Component {
  getData() {
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
      VWarrantyPeriod: '',
      VPurchasingTime: '',
      Conclusion: '',
    };
  }

  render() {
    return (
      <ScrollView style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <ListItem containerStyle={styles.list}>
            {/*<UserAvatar size="medium" />*/}
            <ListItem.Content style={styles.listContent}>
              <ListItem.Title style={styles.listItem}>
                {I18n.t('vehicleHealth')[0]}&emsp;{this.state.VPurchasingTime}
              </ListItem.Title>
              <ListItem.Title style={styles.listItem}>
                {I18n.t('vehicleHealth')[1]}&emsp;{this.state.VWarrantyPeriod}
              </ListItem.Title>
            </ListItem.Content>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.listItem, {fontSize: 24}]}>
                {this.state.Conclusion}
              </Text>
              {/*<Text style={[styles.listItem, {fontSize: 24}]}>km</Text>*/}
            </View>
          </ListItem>

          <View>
            {this.state.list.map((v, i) => (
              <ListItem key={i} bottomDivider>
                {/*<UserAvatar size="small" />*/}
                <ListItem.Content>
                  <ListItem.Title>{v.Title}</ListItem.Title>
                  <ListItem.Subtitle>{v.LastTime}</ListItem.Subtitle>
                </ListItem.Content>
                <View>
                  <Text style={{fontSize: 16}}>{v.Interval}</Text>
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

const styles = StyleSheet.create({
  list: {
    backgroundColor: baseConstant.darkBlue,
    borderWidth: 0,
    borderRadius: 4,
    marginTop: 10,
    height: 90,
  },
  listItem: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContent: {justifyContent: 'space-around', height: '100%'},
});
