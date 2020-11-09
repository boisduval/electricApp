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

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import {ListItem} from 'react-native-elements';

import UserAvatar from './UserAvatar';

const data = [
  {quarter: '1h', earnings: 0.8},
  {quarter: '2h', earnings: 1.2},
  {quarter: '3h', earnings: 0.6},
  {quarter: '4h', earnings: 1.5},
  {quarter: '5h', earnings: 1.2},
  {quarter: '6h', earnings: 0.4},
  {quarter: '7h', earnings: 0.2},
  {quarter: '8h', earnings: 0},
  {quarter: '9h', earnings: 1},
  {quarter: '10h', earnings: 0.9},
  {quarter: '11h', earnings: 1.3},
  {quarter: '12h', earnings: 2},
];

class ChargeAndDischarge extends React.Component {
  getData() {
    const circleProgressList = [
      {
        fill: 40,
        value: '40%',
        name: 'SOC',
      },
      {
        fill: 60,
        value: '60%',
        name: 'SOH',
      },
      {
        fill: 30,
        value: '50',
        name: '循环次数',
      },
    ];
    this.setState({
      data: circleProgressList,
    });
    this.setState({
      list: [
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
        {
          title: '2020-09-01 12:16:18',
          content: '本次放电：0.26 Kw/h',
          time: '本次里程 4.3Km',
        },
      ],
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={[baseStyles.contentBox, {marginTop: 20}]}>
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
                {this.state.data.map((v, i) => (
                  <SvgItem
                    percent={v.fill}
                    size={100}
                    key={3000 + i}
                    name={v.name}
                  />
                ))}
              </View>
            </CardItem>
          </Card>
          {/* 图表 */}
          <Card>
            <CardItem>
              <VictoryChart
                height={300}
                width={Dimensions.get('window').width - 80}
                // width={350}
                // height={200}
                // animate={{duration: 1000}}
                domainPadding={{x: 20}}
                padding={{right: 10, left: 40, top: 60, bottom: 40}}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({datum}) => `剩余电量 ${datum.earnings}`}
                    labelComponent={
                      <VictoryTooltip
                        flyoutPadding={{
                          top: 10,
                          bottom: 10,
                          left: 20,
                          right: 20,
                        }}
                      />
                    }
                  />
                }>
                <VictoryLabel
                  x={5}
                  y={20}
                  text={'剩余电量统计'}
                  style={{fontSize: 16, fontWeight: 'bold'}}
                />
                <VictoryBar
                  data={data}
                  x="quarter"
                  y="earnings"
                  barRatio={0.6}
                  style={{data: {fill: baseConstant.blue}}}
                />
              </VictoryChart>
            </CardItem>
          </Card>
          {/* 列表 */}
          <View>
            {this.state.list.map((v, i) => (
              <Card>
                <ListItem key={4000 + i}>
                  <UserAvatar size="small" />
                  <ListItem.Content>
                    <ListItem.Title>{v.title}</ListItem.Title>
                    <ListItem.Subtitle>{v.content}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Text>{v.time}</Text>
                </ListItem>
              </Card>
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
  constructor() {
    super();
    this.state = {
      percent: 0,
      data: this.getData(0),
    };
  }
  componentDidMount() {
    // this.getData();
    setTimeout(() => {
      this.setState({
        data: this.getData(this.props.percent),
        percent: this.props.percent,
      });
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
                  text={`${Math.round(newProps.percent)}%`}
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

export default ChargeAndDischarge;
