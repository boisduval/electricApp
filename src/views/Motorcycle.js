import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import I18n from '../../locales';
import baseStyles from '../assets/baseStyles';

import CubeItem from '../components/CubeItem';
import {Icon, ListItem} from 'react-native-elements';
import useLanguageUpdate from '../hooks/userLanguageUpdate';
import axios from '../assets/utils/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import Toast from 'react-native-root-toast';
import ImageItem from '../components/ImageItem';
import GradientBoard from '../components/GradientBoard';
import bicycleInfoList from '../assets/styles/bicycleInfoList';
import RoutePlan from '../assets/utils/RoutePlan';

export default class Motorcycle extends Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetVehicleTrafficInfo`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
        },
      })
      .then((res) => {
        if (res) {
          const {
            data: {data},
          } = res;
          let temp = this.state.list;
          temp[1].value = data.ASingleMileage;
          temp[2].value = data.ATotalMileage;
          temp[3].value = data.StopSOC;
          temp[4].value = data.SOH;
          let temp1 = this.state.list1;
          temp1[1].subtitle =
            data.ASingleMileage + 'Km/' + data.TravelTime + 'min';
          temp1[1].param = data.TrackSystemID;
          temp1[2].subtitle = data.StopSOC + '%/' + data.SOH + '%';
          temp1[3].subtitle = data.ATotalMileage + 'Km';
          temp1[5].subtitle = data.Health + I18n.t('motorcycle.info.unit');
          this.setState({
            list: temp,
            list1: temp1,
            imgUrl: data.Img,
            topBoard: {
              title: data.CellTitle,
              time: data.CellUpTime,
            },
          });
          this.getSignalIntensity();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSignalIntensity() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetSignalIntensity`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
        },
      })
      .then((res) => {
        // res
        if (res) {
          const {
            data: {data},
          } = res;
          let temp = [...this.state.list];
          temp[0] = {
            label: data.GPS.name,
            value: data.GPS.value,
            unit: data.GPS.unit,
          };
          this.setState({list: temp});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 落锁
  handleLock() {
    axios
      .post(`${baseUrl.url1}/Vehicle/OpePadlock`, {
        AutoSystemID: store.getState().userId,
        VehicleSystemID: store.getState().vehicleId,
      })
      .then((res) => {
        //  do sth
        // Toast.show(res.data.msg, {
        //   duration: Toast.durations.SHORT,
        //   position: Toast.positions.CENTER,
        //   shadow: true,
        //   animation: true,
        //   hideOnPress: true,
        //   delay: 0,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }
  componentWillUnmount() {
    //  退订
    this._navListener();
  }

  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      list: [
        {
          label: '',
          value: '',
          unit: '',
        },
        {
          label: I18n.t('motorcycle.info.singleBatteryLife'),
          value: '0',
          unit: 'KM',
        },
        {
          label: I18n.t('motorcycle.info.totalMileage'),
          value: '0',
          unit: 'KM',
        },
        {
          label: I18n.t('motorcycle.info.remainBattery'),
          value: '0',
          unit: '%',
        },
        {
          label: I18n.t('motorcycle.info.batteryHealth'),
          value: '0',
          unit: '%',
        },
      ],
      list1: [
        {
          title: I18n.t('nav.purchaseHistory'),
          subtitle: '',
          icon: 'document-text-outline',
          type: 'ionicon',
          path: 'purchaseHistory',
        },
        {
          title: I18n.t('nav.historicalTrack'),
          subtitle: '',
          icon: 'walk-outline',
          type: 'ionicon',
          path: 'historicalTrack',
        },
        {
          title: I18n.t('nav.batteryOverview'),
          subtitle: '',
          type: 'ionicon',
          icon: 'battery-dead-outline',
          path: 'batteryOverview',
        },
        {
          title: I18n.t('nav.drivingSituation'),
          subtitle: '',
          icon: 'bicycle-outline',
          type: 'ionicon',
          path: 'drivingSituation',
        },
        {
          title: I18n.t('nav.safetyCheckup'),
          subtitle: '',
          icon: 'shield-checkmark-outline',
          type: 'ionicon',
          path: 'safetyCheckup',
        },
        {
          title: I18n.t('nav.vehicleHealth'),
          subtitle: '',
          icon: 'fitness-outline',
          type: 'ionicon',
          path: 'vehicleHealth',
        },
      ],
      topBoard: {
        title: '',
        time: '',
      },
    };
  }

  render() {
    return (
      <ScrollView style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          {/*<Button*/}
          {/*  onPress={() => {*/}
          {/*    RoutePlan.isInstallAmap()*/}
          {/*      .then((res) => alert(res))*/}
          {/*      .catch((err) => alert(err));*/}
          {/*  }}*/}
          {/*  title="是否安装高德地图"*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  style={{marginTop: 30}}*/}
          {/*  onPress={() => {*/}
          {/*    RoutePlan.openAmap({*/}
          {/*      slat: 39.92848272,*/}
          {/*      slon: 116.39560823,*/}
          {/*      sname: '我的位置',*/}
          {/*      dlat: 39.98848272,*/}
          {/*      dlon: 116.47560823,*/}
          {/*      dname: '北京',*/}
          {/*      mode: RoutePlan.Mode.DRIVING,*/}
          {/*    })*/}
          {/*      .then((res) => alert(res))*/}
          {/*      .catch((err) => alert(err));*/}
          {/*  }}*/}
          {/*  title="打开高德地图"*/}
          {/*/>*/}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={styles.button}>
                  <Icon
                    name="shield-checkmark-outline"
                    type="ionicon"
                    size={36}
                    color="#666"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.handleLock();
                  }}>
                  <View style={[styles.button, {backgroundColor: '#0EDB00'}]}>
                    <Icon
                      name="power-sharp"
                      type="ionicon"
                      color="#fff"
                      size={36}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10}}>
                {this.state.list.map((v, i) => (
                  <Text key={i} style={{marginTop: 4, fontSize: 14}}>
                    {v.label} {v.value}
                    {v.unit}
                  </Text>
                ))}
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <ImageItem
                uri={this.state.imgUrl}
                width={undefined}
                height={undefined}
                resizeMode="contain"
              />
            </View>
          </View>
          <Options
            navigate={this.props.navigation.navigate}
            list={this.state.list1}
            topBoard={this.state.topBoard}
          />
        </View>
      </ScrollView>
    );
  }
}

function Options(props) {
  useLanguageUpdate();
  return (
    <View>
      <View style={styles.optionsRow}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 8,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigate('singleCellInformation');
            }}>
            <GradientBoard>
              <ListItem containerStyle={bicycleInfoList.list}>
                {/*<UserAvatar size="medium" />*/}
                <ListItem.Content style={bicycleInfoList.listContent}>
                  <ListItem.Title style={[bicycleInfoList.listItem]}>
                    {props.topBoard.title}
                  </ListItem.Title>
                  <ListItem.Title style={[bicycleInfoList.listItem]}>
                    {props.topBoard.time}
                  </ListItem.Title>
                </ListItem.Content>
                <View>
                  <Icon
                    name="chevron-forward-circle-outline"
                    type="ionicon"
                    color="#fff"
                    size={46}
                  />
                </View>
              </ListItem>
            </GradientBoard>
          </TouchableOpacity>
        </View>
        {props.list.map((v, i) => (
          <View style={styles.optionSize} key={i}>
            <CubeItem
              title={v.title}
              subtitle={v.subtitle}
              icon={v.icon}
              type={v.type}
              path={v.path}
              param={v.param}
              navigate={props.navigate}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionSize: {
    width: '50%',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
