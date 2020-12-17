import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Card, CardItem} from 'native-base';
import {Svg} from 'react-native-svg';
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryPie,
  VictoryAnimation,
} from 'victory-native';
import Echarts from '../../lib/rn-echarts';
// import Echarts from 'react-native-charting';
import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import {ListItem} from 'react-native-elements';

import UserAvatar from './UserAvatar';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
const dataset = {
  labels: ['january', 'february', 'may'],
  datasets: [
    {
      data: [100, 500, 300],
      colors: [
        (opacity = 1) => `red`,
        (opacity = 1) => `#ff00ff`,
        (opacity = 1) => `rgba(255, 0, 50, ${opacity})`,
      ],
    },
  ],
};

class PowerConsumption extends React.Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetConsumption`, {
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
        let temp = this.state.option;
        temp.title.text = data.DumpEnergy.Name;
        temp.xAxis.data = data.DumpEnergy.XAxisData;
        temp.series[0].data = data.DumpEnergy.SeriesData[0].data;
        temp.series[0].name = data.DumpEnergy.SeriesData[0].name;
        this.setState({
          circleProgressList: [data.TopSOH, data.TopSOC, data.TopCycle],
          list: data.ChargeList,
          option: temp,
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
        },
        grid: {
          top: 60,
          left: 60,
          right: 40,
          bottom: 40,
        },
        tooltip: {},
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
          },
        ],
        color: [baseConstant.blue],
      },
    };
  }
  render() {
    return (
      <View>
        <ScrollView>
          {/* 圆环进度条*/}
          <Card>
            <CardItem header>
              <View
                style={{
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                {this.state.circleProgressList.map((v, i) => (
                  <SvgItem
                    percent={Number(v.value)}
                    size={100}
                    key={1000 + i}
                    name={v.name}
                    unit={v.unit}
                  />
                ))}
              </View>
            </CardItem>
          </Card>
          {/* 图表 */}
          {/*<View style={{alignItems: 'center'}}>*/}
          {/*  <VictoryChart*/}
          {/*    height={300}*/}
          {/*    width={Dimensions.get('window').width - 40}*/}
          {/*    domainPadding={{x: 20}}*/}
          {/*    padding={{right: 10, left: 40, top: 60, bottom: 40}}*/}
          {/*    containerComponent={*/}
          {/*      <VictoryVoronoiContainer*/}
          {/*        labels={({datum}) => `剩余电量 ${datum.earnings}`}*/}
          {/*        labelComponent={*/}
          {/*          <VictoryTooltip*/}
          {/*            flyoutPadding={{*/}
          {/*              top: 10,*/}
          {/*              bottom: 10,*/}
          {/*              left: 20,*/}
          {/*              right: 20,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        }*/}
          {/*      />*/}
          {/*    }>*/}
          {/*    <VictoryLabel*/}
          {/*      x={5}*/}
          {/*      y={20}*/}
          {/*      text={'剩余电量统计'}*/}
          {/*      style={{fontSize: 16, fontWeight: 'bold'}}*/}
          {/*    />*/}
          {/*    <VictoryBar*/}
          {/*      data={data}*/}
          {/*      x="quarter"*/}
          {/*      y="earnings"*/}
          {/*      barRatio={0.6}*/}
          {/*      style={{data: {fill: baseConstant.blue}}}*/}
          {/*    />*/}
          {/*  </VictoryChart>*/}
          {/*</View>*/}
          <Echarts option={this.state.option} height={300} />
          {/* 列表 */}
          <View>
            {this.state.list.map((v, i) => (
              <ListItem key={2000 + i} bottomDivider>
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

class SvgItem extends React.Component {
  getData(percent) {
    return [
      {x: 1, y: percent},
      {x: 2, y: 100 - percent},
    ];
  }
  setData() {
    this.setState({
      data: this.getData(this.props.percent),
      percent: this.props.percent,
      unit: this.props.unit,
    });
  }
  constructor() {
    super();
    this.state = {
      percent: 0,
      data: this.getData(0),
      unit: '',
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setData();
    }, 200);
  }

  render() {
    const size = this.props.size;
    return (
      <View>
        <Svg viewBox="0 0 400 400" width={size} height={size}>
          <VictoryPie
            standalone={false}
            animate={{duration: 1000}}
            width={400}
            height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({datum}) => {
                  return datum.x === 1 ? baseConstant.blue : '#eee';
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${Math.round(newProps.percent)}${newProps.unit}`}
                  style={{fontSize: 45}}
                />
              );
            }}
          </VictoryAnimation>
        </Svg>
        <View style={[styles.circleTextItem]}>
          <Text style={[styles.circleText]}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circleTextItem: {
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#666',
  },
});

export default PowerConsumption;
