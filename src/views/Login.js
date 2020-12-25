import React from 'react';
import {Container, Content, Button as ButtonBase} from 'native-base';
import {Button, Icon, Text, Input} from 'react-native-elements';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import axios from '../assets/util/http';
import Toast from 'react-native-root-toast';

import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import baseUrl from '../assets/baseUrl';
import {connect} from 'react-redux';
import * as actionCreator from '../redux/actionCreators';
import I18n from '../../locales';
import Link from '../components/Link';
import store from '../redux';
import CountriesSelector from '../components/CountriesSelector';
import SendVerificationCodeButton from '../components/SendVerificationCodeButton';

class Login extends React.Component {
  login() {
    const obj = {
      Phone: this.state.name,
      Pass: this.state.password,
    };
    axios
      .post(`${baseUrl.url1}/VehicleOwner/Login`, obj)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          //  登录成功
          const data = res.data.data;

          // AsyncStorage.setItem('isLoggedIn', '1');
          this.props.setStoreState(
            actionCreator.setCurrentVehicle(data.CurrentVehicle),
          );
          this.props.setStoreState(
            actionCreator.setBatteryId(data.BatterySystemID),
          );
          this.props.setStoreState(actionCreator.setUserId(data.AtuoSystemID));
          Toast.show(res.data.msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
          // this.props.navigation.reset({
          //   routes: [{name: 'main'}],
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCountryNumber(countryNumber) {
    let temp = this.state.postObj;
    temp.countryNumber = countryNumber;
    this.setState({
      postObj: temp,
    });
  }
  register() {
    //  注册http
  }

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'password',
      name: '',
      password: '',
      verificationCode: '',
      postObj: {
        countryNumber: '86',
      },
    };
  }
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{justifyContent: 'space-between', flex: 1}}
          style={[baseStyles.contentBox]}>
          <View>
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
            {(() => {
              if (this.state.activeItem === 'password') {
                // 账号密码登录
                return (
                  <View style={{marginTop: 40}}>
                    <Input
                      placeholder={I18n.t('login.placeholder')[0]}
                      onChangeText={(text) => {
                        this.setState({name: text});
                      }}
                    />
                    <Input
                      secureTextEntry
                      placeholder={I18n.t('login.placeholder')[1]}
                      onChangeText={(text) => {
                        this.setState({password: text});
                      }}
                    />
                  </View>
                );
              } else {
                // 验证码登录
                return (
                  <View style={{marginTop: 40}}>
                    <Input
                      placeholder={I18n.t('login.placeholder')[2]}
                      leftIcon={
                        <CountriesSelector
                          navigation={this.props.navigation}
                          countryNumber={this.state.postObj.countryNumber}
                          setCountryNumber={this.setCountryNumber.bind(this)}
                        />
                      }
                      onChangeText={(text) => {
                        this.setState({name: text});
                      }}
                    />
                    <Input
                      placeholder={I18n.t('login.placeholder')[3]}
                      leftIcon={{type: 'font-awesome-5', name: 'shield-alt'}}
                      rightIcon={<SendVerificationCodeButton />}
                      onChangeText={(text) => {
                        this.setState({verificationCode: text});
                      }}
                    />
                  </View>
                );
              }
            })()}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 20,
              }}>
              <Link text={I18n.t('login.register')} size={16} path="register" />
              <Link
                text={I18n.t('login.retrievePassword')}
                size={16}
                path="retrievePassword"
              />
            </View>
            <View style={{marginHorizontal: 20, marginTop: 40}}>
              <Button
                title={I18n.t('login.button')}
                onPress={this.login.bind(this)}
              />
              <Text>{store.getState().userId}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.textStyle}>{I18n.t('login.tip')[0]}</Text>
            <Link path="agreement" text={I18n.t('nav.agreement')} />

            <Text style={styles.textStyle}>{I18n.t('login.tip')[1]}</Text>
            <Link path="privacy" text={I18n.t('nav.privacy')} />
          </View>
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
  textStyle: {fontSize: 12},
});

const mapStateToProps = (state) => {
  const {userId, currentVehicle, batteryId} = state;
  return {userId, currentVehicle, batteryId};
};

const mapDispatchToProps = (dispatch) => ({
  setStoreState: (setUserIdAction) => dispatch(setUserIdAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
