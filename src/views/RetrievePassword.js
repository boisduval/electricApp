import {StyleSheet, Text, View} from 'react-native';
import baseStyles from '../assets/baseStyles';
import React from 'react';
import I18n from '../../locales';
import {Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actionCreators';
import {Container, Content} from 'native-base';

import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';

import Toast from 'react-native-root-toast';
import VerificationCodeComponent from '../components/VerificationCodeComponent';

class RetrievePassword extends React.Component {
  handleConfirm() {
    const obj = {
      IdentificationCode: this.state.identificationCode,
      Pass: this.state.oldPassword,
      CkeckPass: this.state.newPassword,
      VerificationCode: this.state.verificationCode,
    };
    axios
      .post(`${baseUrl.url1}/VehicleOwner/ForgotPassword`, obj)
      .then((res) => {
        //  do sth
        if (res) {
          Toast.show(res.data.msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          // this.props.navigation.goBack();
          if (this.props.userId !== '') {
            //  登录状态下

            this.props.setStoreState(actionCreators.setUserId(''));
          } else {
            //  未登录
            this.props.navigation.goBack();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      identificationCode: '',
      oldPassword: '',
      newPassword: '',
    };
  }
  render() {
    return (
      <Container>
        <Content style={[baseStyles.contentBox]}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{marginVertical: 10}}>
              {I18n.t('retrievePassword.tip')}
            </Text>
            <VerificationCodeComponent
              handleVerificationCode={(value) => {
                this.setState({verificationCode: value}, () => {
                  console.log(this.state);
                });
              }}
              handleIdentificationCode={(value) => {
                this.setState({identificationCode: value});
              }}
              type="GetLoseVerificationCode"
            />
            <Input
              placeholder={I18n.t('retrievePassword.placeholder')[2]}
              // leftIcon={{type: 'font-awesome-5', name: 'unlock-alt'}}
              secureTextEntry
              onChangeText={(text) => {
                this.setState({oldPassword: text});
              }}
            />
            <Input
              placeholder={I18n.t('retrievePassword.placeholder')[3]}
              secureTextEntry
              // leftIcon={{type: 'font-awesome-5', name: 'unlock'}}
              onChangeText={(text) => {
                this.setState({newPassword: text});
              }}
            />
            <Button
              title={I18n.t('retrievePassword.confirm')}
              onPress={this.handleConfirm.bind(this)}
              containerStyle={styles.buttonContainerStyle}
              buttonStyle={styles.buttonStyle}
              titleStyle={{fontWeight: 'bold'}}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    borderRadius: 10,
    marginTop: 20,
  },
  buttonStyle: {
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonOutlineStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

const mapStateToProps = (state) => {
  const {userId, currentVehicle, batteryId} = state;
  return {userId, currentVehicle, batteryId};
};

const mapDispatchToProps = (dispatch) => ({
  setStoreState: (setAction) => dispatch(setAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(RetrievePassword);
