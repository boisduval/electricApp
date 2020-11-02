import React from 'react';

import baseStyles from '../assets/baseStyles';
import {ScrollView, Text, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

class MyMessages extends React.Component {
  getMessageList() {
    this.setState({
      list: [
        {
          title: '标题',
          content: '内容',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
        },
      ],
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.getMessageList();
  }

  render() {
    return (
      <View style={[baseStyles.tabViewBox]}>
        <ScrollView>
          {this.state.list.map((v, i) => (
            <ListItem bottomDivider key={i}>
              <Avatar
                size="small"
                rounded
                title="AF"
                overlayContainerStyle={{backgroundColor: '#BCBEC1'}}
              />
              <ListItem.Content>
                <ListItem.Title>{v.title}</ListItem.Title>
                <ListItem.Subtitle>{v.content}</ListItem.Subtitle>
              </ListItem.Content>
              <Text>{v.time}</Text>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default MyMessages;
