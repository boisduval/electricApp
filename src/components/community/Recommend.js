import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import {Card, CardItem, Left, Right, Button, Image, Body} from 'native-base';
import UserAvatar from '../UserAvatar';
import {Icon} from 'react-native-elements';

class Recommend extends React.Component {
  getData() {
    return new Promise((resolve) => {
      axios
        .get(`${baseUrl.url1}/Community/GetRecommends`, {
          params: {
            AutoSystemID: store.getState().userId,
            page: 0,
            limit: 10,
          },
        })
        .then((res) => {
          // res
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  setData() {
    this.getData().then((res) => {
      this.setState({
        list: res.data.data,
      });
    });
  }

  componentDidMount() {
    this.setData();
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  render() {
    return (
      <ScrollView style={{padding: 10}}>
        {this.state.list.map((v, i) => (
          <Item key={i} data={v} />
        ))}
      </ScrollView>
    );
  }
}

class Item extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <Card style={{borderRadius: 10}}>
        {/*  header  */}
        <CardItem>
          <Left>
            <UserAvatar size="small" />
          </Left>
          <Right>
            <TouchableOpacity
              onPress={() => {
                console.log('ok');
              }}>
              <Icon name="ellipsis-horizontal" type="ionicon" size={22} />
              {/*<Text>123</Text>*/}
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{this.props.data.title}</Text>
          </Body>
        </CardItem>

        <CardItem cardBody>
          {data.imgs.map((v, i) => (
            <Image
              source={{uri: v}}
              key={i}
              style={{height: 200, width: null, flex: 1}}
            />
          ))}
        </CardItem>
        <CardItem>
          <Left>
            <Text style={{color: '#666', fontSize: 12}}>{data.dtime}</Text>
          </Left>
          <Right>
            <View style={{flexDirection: 'row'}}>
              <Button transparent iconLeft>
                <Icon
                  name="chatbubble-ellipses"
                  type="ionicon"
                  color="#666"
                  size={18}
                />
                <Text style={{marginLeft: 4, fontSize: 10, color: '#666'}}>
                  {data.replies}
                </Text>
              </Button>
              <Button transparent iconLeft style={{marginLeft: 10}}>
                <Icon name="heart" type="ionicon" color="#666" size={18} />
                <Text style={{marginLeft: 4, fontSize: 10, color: '#666'}}>
                  {data.thumbup}
                </Text>
              </Button>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default Recommend;
