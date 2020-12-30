import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {H1} from 'native-base';
import baseStyles from '../../assets/baseStyles';
import Link from '../../components/Link';
import I18n from '../../../locales';
import {Button, Input} from 'react-native-elements';
import NoticeComponent from '../../components/NoticeComponent';
import axios from '../../assets/util/http';
import baseUrl from '../../assets/baseUrl';
import * as actionCreator from '../../redux/actionCreators';
import Toast from 'react-native-root-toast';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import SendVerificationCodeButton from '../../components/SendVerificationCodeButton';
import CountriesSelector from '../../components/CountriesSelector';

class PhoneNumber extends React.Component {
  login() {
    const obj = {
      IdentificationCode: this.state.identificationCode,
      VerificationCode: this.state.verificationCode,
    };
    axios
      .post(`${baseUrl.url1}/VehicleOwner/LoginSMS`, obj)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          //  登录成功
          const data = res.data.data;
          console.log(data);
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCountryNumber(countryNumber) {
    this.setState({
      countryNumber: countryNumber,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      countryNumber: '86',
      phoneNumber: '',
      disabled: false,
      identificationCode: '',
    };
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{justifyContent: 'space-between', flex: 1}}
          style={[baseStyles.contentBox]}>
          <View style={[styles.box]}>
            <H1 style={{fontWeight: 'bold', fontSize: 30, lineHeight: 80}}>
              {I18n.t('login.tab')[1]}
            </H1>
            <View style={styles.buttonBox}>
              <Input
                autoComplete="off"
                keyboardType="number-pad"
                maxLength={11}
                placeholder={I18n.t('login.placeholder')[2]}
                leftIcon={
                  <CountriesSelector
                    navigation={this.props.navigation}
                    countryNumber={this.state.countryNumber}
                    setCountryNumber={this.setCountryNumber.bind(this)}
                  />
                }
                onChangeText={(text) => {
                  this.setState({phoneNumber: text});
                }}
              />
              <Input
                placeholder={I18n.t('login.placeholder')[3]}
                leftIcon={{type: 'font-awesome-5', name: 'shield-alt'}}
                rightIcon={
                  <SendVerificationCodeButton
                    Prefix={this.state.countryNumber}
                    Phone={this.state.phoneNumber}
                    disabled={this.state.phoneNumber == ''}
                    setIdentificationCode={(identificationCode) =>
                      this.setState({identificationCode: identificationCode})
                    }
                  />
                }
                onChangeText={(text) => {
                  this.setState({verificationCode: text});
                }}
              />
              <Button
                title={I18n.t('login.button')}
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={styles.buttonStyle}
                titleStyle={{fontWeight: 'bold'}}
                onPress={this.login.bind(this)}
              />
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Link
                  size={14}
                  title={I18n.t('login.retrievePassword')}
                  path="retrievePassword"
                />
              </View>
            </View>
          </View>
          <NoticeComponent registerTipShown={false} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    paddingTop: 30,
    // justifyContent: 'space-between',
  },
  buttonBox: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
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
  setStoreState: (setUserIdAction) => dispatch(setUserIdAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
