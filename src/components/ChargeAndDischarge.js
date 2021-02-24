import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Echarts, echarts} from '../../lib/rn-echarts';
import {ListItem} from 'react-native-elements';

import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import Loading from './Loading';
import Toast from 'react-native-root-toast';
import circleProgressBanner from '../assets/styles/circleProgressBanner';

class ChargeAndDischarge extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetChargeDischarge`, {
        params: {
          AutoSystemID: store.getState().userId,
          VehicleSystemID: store.getState().vehicleId,
        },
      })
      .then((res) => {
        // res
        const {
          data: {data},
        } = res;
        let temp = {...this.state.option};
        temp.title.text = data.ChargeDischargeEnergy.Name;
        temp.xAxis.data = data.ChargeDischargeEnergy.XAxisData;
        temp.xAxis.axisPointer.value =
          data.ChargeDischargeEnergy.XAxisData[
            Math.floor(data.ChargeDischargeEnergy.XAxisData.length / 2)
          ];
        temp.series[0].data = data.ChargeDischargeEnergy.SeriesData[0].data;
        temp.series[0].name = data.ChargeDischargeEnergy.SeriesData[0].name;
        temp.series[0].stack = data.ChargeDischargeEnergy.SeriesData[0].stack;
        temp.series[1].data = data.ChargeDischargeEnergy.SeriesData[1].data;
        temp.series[1].name = data.ChargeDischargeEnergy.SeriesData[1].name;
        temp.series[1].stack = data.ChargeDischargeEnergy.SeriesData[1].stack;
        this.setState({
          circleProgressList: [
            data.TopCharge,
            data.TopDischarge,
            data.TopTemperature,
          ],
          list: data.ChargeDischargeList,
          option: temp,
        });
        this.setOption();
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

  setOption(name, value, unit, percent) {
    return {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646',
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {offset: 0, color: '#146ad4'},
              //   {offset: 1, color: '#4396ee'},
              // ]),
            },
          },
          axisLine: {
            lineStyle: {
              width: 10,
            },
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            distance: 50,
          },
          data: [
            {
              value: percent,
              name: name,
              title: {
                offsetCenter: ['0%', '130%'],
              },
              detail: {
                offsetCenter: ['0%', '0%'],
              },
            },
          ],
          title: {
            fontSize: 14,
          },
          detail: {
            width: 40,
            lineHeight: 16,
            overflow: 'break',
            fontSize: 14,
            color: 'auto',
            borderWidth: 0,
            formatter: `${value} ${unit}`,
          },
        },
      ],
      backgroundColor: '#0f375f',
    };
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
      refreshing: false,
      list: [],
      circleProgressList: [
        {
          name: '',
          value: 0,
          unit: '%',
        },
        {
          name: '',
          value: 0,
          unit: '%',
        },
        {
          name: '',
          value: 0,
          unit: '',
        },
      ],
      option: {
        title: {
          text: '',
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 14,
          },
        },
        grid: {
          top: 50,
          left: 50,
          right: 40,
          bottom: 70,
        },
        dataZoom: [
          {
            type: 'inside',
            throttle: 50,
          },
        ],
        tooltip: {
          confine: true,
          triggerOn: 'none',
        },
        xAxis: {
          type: 'category',
          data: [],
          axisPointer: {
            value: '1h',
            snap: true,
            lineStyle: {
              color: 'auto',
              width: 2,
            },
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              },
              backgroundColor: 'auto',
            },
            handle: {
              show: true,
              color: 'auto',
              size: 30,
              margin: 40,
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: [],
            type: 'bar',
            name: '',
            stack: '',
            barWidth: 10,
            itemStyle: {
              // barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#146ad4'},
                {offset: 1, color: '#43b8ee'},
              ]),
            },
          },
          {
            data: [],
            type: 'bar',
            name: '',
            stack: '',
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgb(20,151,212)'},
                {offset: 0.2, color: 'rgb(20,158,212)'},
                {offset: 1, color: 'rgb(20,151,212,0)'},
              ]),
            },
            barGap: '-100%',
            z: -12,
          },
        ],
        backgroundColor: '#0f375f',
      },
    };
  }
  render() {
    return (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          data={this.state.list}
          ListHeaderComponent={
            <>
              {/* 圆环进度条*/}

              <View style={circleProgressBanner.circleProgressBox}>
                {this.state.circleProgressList.map((v, i) => (
                  <View style={{flex: 1}} key={i}>
                    <Echarts
                      option={this.setOption(
                        v.name,
                        v.value,
                        v.unit,
                        v.percent,
                      )}
                      height={150}
                      theme="dark"
                    />
                  </View>
                ))}
              </View>

              {/* 图表 */}
              <View style={circleProgressBanner.barChartBox}>
                <Echarts option={this.state.option} height={260} theme="dark" />
              </View>
            </>
          }
          renderItem={({item}) => (
            <ListItem bottomDivider style={{paddingHorizontal: 6}}>
              {/*<UserAvatar size="small" />*/}
              <ListItem.Content>
                <ListItem.Title>{item.WriteTime}</ListItem.Title>
                <ListItem.Subtitle>{item.Charge}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.Discharge}</ListItem.Subtitle>
              </ListItem.Content>
              <Text>{item.Mileage}</Text>
            </ListItem>
          )}
        />
      </View>
    );
  }
}

export default ChargeAndDischarge;
