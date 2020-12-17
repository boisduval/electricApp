import React from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';

import baseStyles from '../../assets/baseStyles';
import {Button, ListItem} from 'react-native-elements';
import UserAvatar from '../../components/UserAvatar';
import * as baseConstant from '../../assets/baseConstant';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import store from '../../redux';
import Loading from '../../components/Loading';
import Toast from 'react-native-root-toast';

export default class SafetyCheckup extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/GetSafetyCheckup`, {
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
        this.setState({
          QuestionNumber: data.QuestionNumber,
          HealthExamination: data.HealthExamination,
          list: data.Items,
        });
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
      QuestionNumber: {},
      HealthExamination: {},
      list: [],
      refreshing: false,
    };
  }

  render() {
    return (
      <ScrollView
        style={baseStyles.tabViewBox}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <View style={baseStyles.contentBox}>
          <Box
            QuestionNumber={this.state.QuestionNumber}
            HealthExamination={this.state.HealthExamination}
          />
          {this.state.list.map((v, i) => (
            <Item
              key={i}
              Title={v.Title}
              RiskTitle={v.RiskTitle}
              SubItems={v.SubItems}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

class Box extends React.Component {
  render() {
    return (
      <ListItem containerStyle={styles.list}>
        <UserAvatar size="medium" />
        <ListItem.Content>
          <ListItem.Title style={{color: '#666'}}>
            {this.props.QuestionNumber.name}&emsp;
            {this.props.QuestionNumber.value}
            {this.props.QuestionNumber.unit}
          </ListItem.Title>
          <ListItem.Title style={{color: '#666'}}>
            {this.props.HealthExamination.name}&emsp;
            {this.props.HealthExamination.value}
            {this.props.HealthExamination.unit}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  }
}

class Item extends React.Component {
  handlePress(prop) {
    if (prop.method === 'Post') {
      axios
        .post(`${baseUrl.url1 + prop.url}`, this.arrToParam(prop.datas))
        .then((res) => {
          //  do sth
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  arrToParam(arr) {
    let string = '';
    let temp = arr.map((v) => {
      return '"' + v.name + '"' + ':' + '"' + v.value + '"';
    });
    string = temp.join(',');
    string = '{' + string + '}';
    return JSON.parse(string);
  }
  render() {
    return (
      <View style={styles.item}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{this.props.Title}</Text>
          <Text style={styles.subTitleText}>{this.props.RiskTitle}</Text>
        </View>
        {this.props.SubItems.map((v, i) => (
          <View style={styles.content} key={i}>
            <View>
              <Text style={styles.contentText}>{v.title}</Text>
              <Text style={styles.descriptionText}>{v.name}</Text>
            </View>
            {(() => {
              if (v.request) {
                return (
                  <View style={{justifyContent: 'center'}}>
                    <Button
                      title={v.request.btnname}
                      type="outline"
                      buttonStyle={styles.button}
                      titleStyle={styles.buttonTitle}
                      onPress={() => {
                        this.handlePress(v.request);
                      }}
                    />
                  </View>
                );
              }
            })()}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
  },
  title: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  titleText: {
    color: '#666',
    fontSize: 16,
  },
  subTitleText: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  contentText: {
    fontSize: 14,
  },
  descriptionText: {
    color: '#666',
    fontSize: 12,
  },
  button: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderColor: '#666',
  },
  buttonTitle: {
    fontSize: 12,
    color: '#666',
  },
  list: {
    backgroundColor: '#f2f2f2',
    borderWidth: 0,
    borderRadius: 4,
    marginVertical: 10,
  },
});
