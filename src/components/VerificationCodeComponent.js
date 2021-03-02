import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n from '../../locales';
import axios from '../assets/utils/http';
import baseUrl from '../assets/baseUrl';
import PropTypes from 'prop-types';
import * as RootNavigation from '../RootNavigation';

let timer;

class VerificationCodeComponent extends React.Component {
  setCountryNumber(countryNumber) {
    this.setState({
      countryNumber,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      countryNumber: '86',
      phoneNumber: '',
    };
  }

  render() {
    return (
      <>
        <Input
          autoComplete="off"
          keyboardType="number-pad"
          maxLength={11}
          placeholder={I18n.t('login.placeholder')[2]}
          leftIcon={
            <CountriesSelector
              navigation={RootNavigation}
              countryNumber={this.state.countryNumber}
              setCountryNumber={this.setCountryNumber.bind(this)}
            />
          }
          onChangeText={(text) => {
            this.setState({
              phoneNumber: text,
            });
          }}
        />
        <Input
          placeholder={I18n.t('login.placeholder')[3]}
          leftIcon={{type: 'font-awesome-5', name: 'shield-alt'}}
          rightIcon={
            <SendVerificationCodeButton
              type={this.props.type}
              disabled={this.state.phoneNumber === ''}
              Prefix={this.state.countryNumber}
              Phone={this.state.phoneNumber}
              handleIdentificationCode={this.props.handleIdentificationCode}
            />
          }
          onChangeText={(text) => {
            this.props.handleVerificationCode(text);
          }}
        />
      </>
    );
  }
}

class SendVerificationCodeButton extends React.Component {
  sendCode() {
    //  发送验证码
    axios
      .get(`${baseUrl.url1}/Verification/${this.props.type}`, {
        params: {
          Prefix: this.props.Prefix,
          Phone: this.props.Phone,
        },
      })
      .then((res) => {
        // res
        if (res) {
          const {
            data: {data},
          } = res;
          this.props.handleIdentificationCode(data.IdentificationCode);
          // console.log(data);
          // setDisabled(!disabled);
          this.setState({disabled: true});
          timer = setInterval(() => {
            if (this.state.time < 1) {
              this.setState({disabled: false});
              clearInterval(timer);
              this.setState({time: 60});
            }
            console.log(this.state.time);
            this.setState((prevState) => ({time: prevState.time - 1}));
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    if (timer !== null) {
      clearInterval(timer);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      time: 60,
    };
  }
  render() {
    return (
      <View>
        <Button
          disabled={this.state.disabled || this.props.disabled}
          containerStyle={{borderRadius: 50, margin: 0}}
          titleStyle={{fontSize: 12, fontWeight: 'bold'}}
          title={
            this.state.disabled
              ? `${I18n.t('verificationCode.resend')}(${this.state.time}S)`
              : I18n.t('verificationCode.get')
          }
          onPress={() => {
            this.sendCode();
          }}
        />
      </View>
    );
  }
}

function CountriesSelector(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        axios
          .get(`${baseUrl.url1}/VehicleOwner/GetCountryCode`)
          .then((res) => {
            // res
            const {
              data: {data},
            } = res;
            props.navigation.navigate('countries', {
              list: data,
              setCountryNumber: props.setCountryNumber,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRightWidth: 1,
          borderColor: '#ccc',
          paddingRight: 4,
          paddingVertical: 3,
        }}>
        <Icon name="mobile-alt" type="font-awesome-5" />
        <Text style={{marginLeft: 10, marginRight: 4, fontSize: 16}}>
          +{props.countryNumber}
        </Text>
        <Icon name="caret-down-outline" type="ionicon" size={16} />
      </View>
    </TouchableOpacity>
  );
}

VerificationCodeComponent.propTypes = {
  handleIdentificationCode: PropTypes.func.isRequired,
  handleVerificationCode: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['GetLoseVerificationCode', 'GetLoginVerificationCode'])
    .isRequired,
};

export default VerificationCodeComponent;
