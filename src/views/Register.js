import {Text, TouchableOpacity, View} from 'react-native';
import baseStyles from '../assets/baseStyles';
import React, {useEffect} from 'react';
import I18n from '../../locales';
import {Icon, Input, Button} from 'react-native-elements';
import Countries from './Countries';
// import {Button} from 'native-base';
import * as baseConstant from '../assets/baseConstant';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import CountriesSelector from '../components/CountriesSelector';
import SendVerificationCodeButton from '../components/SendVerificationCodeButton';

export default class Register extends React.Component {
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
      postObj: {
        countryNumber: '86',
      },
    };
  }
  render() {
    return (
      <View style={baseStyles.tabViewBox}>
        <View style={[baseStyles.contentBox, {marginTop: 20}]}>
          {/*<Text style={{marginVertical: 20}}>*/}
          {/*  {I18n.t('retrievePassword.tip')}*/}
          {/*</Text>*/}
          <Input
            placeholder={I18n.t('register.placeholder')[0]}
            leftIcon={
              <CountriesSelector
                navigation={this.props.navigation}
                countryNumber={this.state.postObj.countryNumber}
                setCountryNumber={this.setCountryNumber.bind(this)}
              />
            }
          />
          <Input
            placeholder={I18n.t('register.placeholder')[1]}
            leftIcon={{type: 'font-awesome-5', name: 'shield-alt'}}
            rightIcon={<SendVerificationCodeButton />}
          />
          <Input
            placeholder={I18n.t('register.placeholder')[2]}
            leftIcon={{type: 'font-awesome-5', name: 'unlock-alt'}}
          />
          <Input
            placeholder={I18n.t('register.placeholder')[3]}
            leftIcon={{type: 'font-awesome-5', name: 'unlock'}}
          />
        </View>
      </View>
    );
  }
}
