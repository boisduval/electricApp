import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Echarts from '../../lib/rn-echarts';
import {ListItem} from 'react-native-elements';

import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';

class ChargeAndDischarge extends React.Component {
  getData() {
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
        console.log(data);
        let temp = this.state.option;
        temp.title.text = data.ChargeDischargeEnergy.Name;
        temp.xAxis.data = data.ChargeDischargeEnergy.XAxisData;
        temp.series[0].data = data.ChargeDischargeEnergy.SeriesData[0].data;
        temp.series[0].name = data.ChargeDischargeEnergy.SeriesData[0].name;
        temp.series[0].stack = data.ChargeDischargeEnergy.SeriesData[0].stack;
        temp.series[1].data = data.ChargeDischargeEnergy.SeriesData[1].data;
        temp.series[1].name = data.ChargeDischargeEnergy.SeriesData[1].name;
        temp.series[1].stack = data.ChargeDischargeEnergy.SeriesData[1].stack;
        this.setState(
          {
            circleProgressList: [
              data.TopCharge,
              data.TopDischarge,
              data.TopTemperature,
            ],
            list: data.ChargeDischargeList,
            option: temp,
          },
          () => {
            console.log(this.state);
          },
        );
        this.setOption();
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
      backgroundColor: '#193085',
    };
  }

  componentDidMount() {
    this.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
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
          text: '123456',
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
          bottom: 40,
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
        },
        xAxis: {
          type: 'category',
          data: [],
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
          },
          {
            data: [],
            type: 'bar',
            name: '',
            stack: '',
          },
        ],
        backgroundColor: '#193085',
      },
    };
  }
  render() {
    return (
      <View>
        <ScrollView>
          {/* 圆环进度条*/}

          <View style={styles.circleProgressBox}>
            {this.state.circleProgressList.map((v, i) => (
              <View style={{flex: 1}}>
                <Echarts
                  option={this.setOption(v.name, v.value, v.unit, v.percent)}
                  height={150}
                  theme="dark"
                />
              </View>
            ))}
          </View>

          {/* 图表 */}
          <View style={styles.barChartBox}>
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
                  <ListItem.Subtitle>{v.Charge}</ListItem.Subtitle>
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

const styles = StyleSheet.create({
  circleProgressBox: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  barChartBox: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default ChargeAndDischarge;
