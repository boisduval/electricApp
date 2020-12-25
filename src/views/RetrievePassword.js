import {Text, View} from 'react-native';
import baseStyles from '../assets/baseStyles';
import React from 'react';
import I18n from '../../locales';
import {Input} from 'react-native-elements';
import CountriesSelector from '../components/CountriesSelector';
import SendVerificationCodeButton from '../components/SendVerificationCodeButton';

export default class RetrievePassword extends React.Component {
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
    const value = this.props.route.params
      ? this.props.route.params.hasOwnProperty('value')
        ? this.props.route.params.value
        : '86'
      : '86';
    return (
      <View style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <Text style={{marginVertical: 20}}>
            {I18n.t('retrievePassword.tip')}
          </Text>
          <Input
            placeholder={I18n.t('retrievePassword.placeholder')[0]}
            leftIcon={
              <CountriesSelector
                navigation={this.props.navigation}
                countryNumber={this.state.postObj.countryNumber}
                setCountryNumber={this.setCountryNumber.bind(this)}
              />
            }
          />
          <Input
            placeholder={I18n.t('retrievePassword.placeholder')[1]}
            leftIcon={{type: 'font-awesome-5', name: 'shield-alt'}}
            rightIcon={<SendVerificationCodeButton />}
          />
          <Input
            placeholder={I18n.t('retrievePassword.placeholder')[2]}
            leftIcon={{type: 'font-awesome-5', name: 'unlock-alt'}}
          />
          <Input
            placeholder={I18n.t('retrievePassword.placeholder')[3]}
            leftIcon={{type: 'font-awesome-5', name: 'unlock'}}
          />
        </View>
      </View>
    );
  }
}
