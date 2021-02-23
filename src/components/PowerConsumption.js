import React from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Echarts, echarts} from '../../lib/rn-echarts';
import {ListItem} from 'react-native-elements';
import {Spinner} from 'native-base';
import Toast from 'react-native-root-toast';

import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import Loading from './Loading';
import circleProgressBanner from '../assets/styles/circleProgressBanner';

class PowerConsumption extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetConsumption`, {
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
        temp.title.text = data.DumpEnergy.Name;
        temp.xAxis.data = data.DumpEnergy.XAxisData;
        temp.xAxis.axisPointer.value =
          data.DumpEnergy.XAxisData[
            Math.floor(data.DumpEnergy.XAxisData.length / 2)
          ];
        temp.series[0].data = data.DumpEnergy.SeriesData[0].data;
        temp.series[0].name = data.DumpEnergy.SeriesData[0].name;
        this.setState({
          circleProgressList: [data.TopSOH, data.TopSOC, data.TopCycle],
          list: data.ChargeList,
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

  setOption(name, value, unit) {
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
              value: value,
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
            width: 30,
            height: 14,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: `${value}${unit}`,
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
            // barWidth: 10,
            barCategoryGap: '40%',
            itemStyle: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#146ad4'},
                {offset: 1, color: '#43b8ee'},
              ]),
            },
          },
        ],
        backgroundColor: '#0f375f',
      },
    };
  }
  render() {
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
          {/* 圆环进度条*/}

          <View style={circleProgressBanner.circleProgressBox}>
            {this.state.circleProgressList.map((v, i) => (
              <View style={{flex: 1}} key={i}>
                <Echarts
                  option={this.setOption(v.name, v.value, v.unit)}
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
          {/* 列表 */}
          <View>
            {this.state.list.map((v, i) => (
              <ListItem
                key={i + ''}
                bottomDivider
                style={{paddingHorizontal: 6}}>
                {/*<UserAvatar size="small" />*/}
                <ListItem.Content>
                  <ListItem.Title>{v.WriteTime}</ListItem.Title>
                  <ListItem.Subtitle>{v.Discharge}</ListItem.Subtitle>
                </ListItem.Content>
                <Text>{v.Mileage}</Text>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default PowerConsumption;
