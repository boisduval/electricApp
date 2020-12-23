import {Text, TouchableOpacity, View} from 'react-native';
import baseStyles from '../assets/baseStyles';
import React from 'react';
import I18n from '../../locales';
import {Icon, Input} from 'react-native-elements';
import {Button} from 'native-base';
import * as baseConstant from '../assets/baseConstant';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';

export default class RetrievePassword extends React.Component {
  render() {
    return (
      <View style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <Text style={{marginBottom: 40}}>
            {I18n.t('retrievePassword.tip')}
          </Text>
          <Input
            placeholder={I18n.t('retrievePassword.placeholder')[0]}
            leftIcon={LeftComponent(this.props.navigation)}
          />
          <Input
            placeholder={I18n.t('retrievePassword.placeholder')[1]}
            leftIcon={{type: 'font-awesome-5', name: 'shield-alt'}}
            rightIcon={RightComponent}
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

function LeftComponent(props) {
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
            props.navigate('countries', {list: data});
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
        <Text style={{marginLeft: 10, marginRight: 4, fontSize: 16}}>+86</Text>
        <Icon name="caret-down-outline" type="ionicon" size={16} />
      </View>
    </TouchableOpacity>
  );
}

function RightComponent() {
  return (
    <View>
      <Button
        rounded
        small
        style={{padding: 10, backgroundColor: baseConstant.blue}}>
        <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
          获取验证码
        </Text>
      </Button>
    </View>
  );
}
