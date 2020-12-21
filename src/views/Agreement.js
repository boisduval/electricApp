// 用户协议
import * as React from 'react';
import {Text} from 'react-native-elements';
import {ScrollView, View} from 'react-native';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';

export default class Agreement extends React.Component {
  getData() {
    axios
      .get(`${baseUrl.url1}/VehicleOwner/GetUserAgreement`)
      .then((res) => {
        // res
        const {
          data: {data},
        } = res;
        this.setState({
          text: data,
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
      text: '',
    };
  }

  render() {
    return (
      <ScrollView style={{padding: 10}}>
        <Text>{this.state.text}</Text>
      </ScrollView>
    );
  }
}
