import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import baseStyles from '../assets/baseStyles';
import {ListItem} from 'react-native-elements';
import * as baseConstant from '../assets/baseConstant';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import I18n from '../../locales';

export default class BatteryOverview extends React.Component {
  componentDidMount() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetBatterySummary`, {
        params: {
          AutoSystemID: store.getState().userId,
          BatterySystemID: store.getState().batteryId,
        },
      })
      .then((res) => {
        // res
        if (res) {
          const {
            data: {data},
          } = res;
          this.setState({
            list: data.Status,
            DumpEnergy: data.DumpEnergy,
            ExpectsMileage: data.ExpectsMileage,
            SOC: data.SOC,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      DumpEnergy: '',
      ExpectsMileage: '',
      SOC: '',
    };
  }
  render() {
    return (
      <ScrollView style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <ListItem containerStyle={styles.list}>
            {/*<UserAvatar size="medium" />*/}
            <ListItem.Content>
              <ListItem.Title style={[styles.listItem]}>
                {I18n.t('battery.remainBattery')}&emsp;{this.state.DumpEnergy}
                Kwh
              </ListItem.Title>
              <ListItem.Title style={[styles.listItem]}>
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

const styles = StyleSheet.create({
  list: {
    backgroundColor: baseConstant.darkBlue,
    borderWidth: 0,
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 20,
  },
  listItem: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
