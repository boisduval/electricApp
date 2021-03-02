import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import axios from '../../assets/utils/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import Item from './Item';

class Recommend extends React.Component {
  getData() {
    return new Promise((resolve) => {
      axios
        .get(`${baseUrl.url1}/Community/GetRecommends`, {
          params: {
            AutoSystemID: store.getState().userId,
            page: this.state.page,
            limit: this.state.limit,
          },
        })
        .then((res) => {
          // res
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

  setStar(MSystemID, LikeStatus) {
    axios
      .post(`${baseUrl.url1}/Community/SetLike`, {
        AutoSystemID: store.getState().userId,
        MSystemID,
        LikeStatus,
      })
      .then((res) => {
        //  do sth
        if (res.data.code === 0) {
          this.setData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.setData();
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 0,
      limit: 10,
    };
  }

  render() {
    return (
      <ScrollView style={{marginVertical: 10, paddingHorizontal: 10}}>
        {this.state.list.map((v, i) => (
          <Item
            key={i}
            data={v}
            setStar={this.setStar.bind(this)}
            path="GetRecommend"
          />
        ))}
      </ScrollView>
    );
  }
}

export default Recommend;
