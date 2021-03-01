import React from 'react';

import baseStyles from '../assets/baseStyles';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

class MyMessages extends React.Component {
  getMessageList() {
    this.setState({
      list: [
        {
          title: '标题',
          content: '内容',
          time: '12小时13分钟前',
          id: '123456',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '123457',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '123458',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '123459',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234510',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234511',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234512',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234513',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234514',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234515',
        },
        {
          title: '车辆振动报警',
          content: '消息时间：2020-7-25 12:12:56',
          time: '12小时13分钟前',
          id: '1234516',
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
    const Item = ({item}) => {
      return (
        <ListItem bottomDivider>
          {/*<UserAvatar size="small" />*/}
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
          </ListItem.Content>
          <Text>{item.time}</Text>
        </ListItem>
      );
    };
    return (
      <View style={[baseStyles.tabViewBox]}>
        {/*<ScrollView>*/}
        {/*  {this.state.list.map((v, i) => (*/}
        {/*    */}
        {/*  ))}*/}
        {/*</ScrollView>*/}
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.list}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
  },
});

export default MyMessages;
