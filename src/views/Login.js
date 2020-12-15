import React from 'react';
import {Container, Content, Form, Item, Label, Input} from 'native-base';
import {Button, Text} from 'react-native-elements';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import axios from '../assets/util/http';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import baseUrl from '../assets/baseUrl';
import {connect} from 'react-redux';
import * as actionCreator from '../redux/actionCreators';
import I18n from '../../locales';

class Login extends React.Component {
  login() {
    const obj = {
      Phone: this.state.name,
      Pass: this.state.password,
    };
    axios
      .post(`${baseUrl.url1}/VehicleOwner/Login`, obj)
      .then((res) => {
        if (res.data.code === 0) {
          //  登录成功
          const data = res.data.data;
          console.log(res.data.data);
          AsyncStorage.setItem('AutoSystemID', data.AtuoSystemID);
          this.props.setStoreState(actionCreator.setUserId(data.AtuoSystemID));
          this.props.setStoreState(
            actionCreator.setCurrentVehicle(data.CurrentVehicle),
          );
          this.props.setStoreState(
            actionCreator.setBatteryId(data.BatterySystemID),
          );
          Toast.show(res.data.msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          this.props.navigation.reset({
            routes: [{name: 'main'}],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'password',
      name: '',
      password: '',
    };
  }
  render() {
    return (
      <Container>
        <Content style={baseStyles.contentBox}>
          <View style={{alignItems: 'center'}}>
            <View style={{marginTop: 80, flexDirection: 'row'}}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.setState({activeItem: 'password'});
                }}>
                <View
                  style={
                    this.state.activeItem === 'password'
                      ? [styles.titleBox, styles.activeTitleBox]
                      : styles.titleBox
                  }>
                  <Text
                    style={{color: '#666', fontSize: 20, fontWeight: 'bold'}}>
                    {I18n.t('login.tab')[0]}
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  this.setState({activeItem: 'verificationCode'});
                }}>
                <View
                  style={
                    this.state.activeItem === 'verificationCode'
                      ? [
                          styles.activeTitleBox,
                          styles.titleBox,
                          {marginLeft: 30},
                        ]
                      : [styles.titleBox, {marginLeft: 30}]
                  }>
                  <Text
                    style={{color: '#666', fontSize: 20, fontWeight: 'bold'}}>
                    {I18n.t('login.tab')[1]}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <Form style={{marginTop: 40}}>
            <Item floatingLabel>
              <Label>{I18n.t('login.placeholder')[0]}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({name: text});
                }}
              />
            </Item>
            <Item floatingLabel last>
              <Label>{I18n.t('login.placeholder')[1]}</Label>
              <Input
                secureTextEntry
                onChangeText={(text) => {
                  this.setState({password: text});
                }}
              />
            </Item>
          </Form>
          <View style={{marginHorizontal: 20, marginTop: 40}}>
            <Button title="登录" onPress={this.login.bind(this)} />
          </View>
          <View></View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titleBox: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  activeTitleBox: {
    borderBottomColor: baseConstant.blue,
    borderBottomWidth: 4,
  },
});

const mapStateToProps = (state) => {
  const {userId, currentVehicle, batteryId} = state;
  return {userId, currentVehicle, batteryId};
};

const mapDispatchToProps = (dispatch) => ({
  setStoreState: (setUserIdAction) => dispatch(setUserIdAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
