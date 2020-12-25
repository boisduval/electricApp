import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from '../../locales';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';

let timer;
export default function SendVerificationCodeButton() {
  const [disabled, setDisabled] = React.useState(false);
  const [time, setTime] = React.useState(60);
  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer);
      setDisabled(false);
      setTime(60);
    }
  }, [time]);
  const sendCode = () => {
    //  发送验证码
    axios
      .get(`${baseUrl.url1}`, {
        params: {
          AutoSystemID: store.getState().userId,
        },
      })
      .then((res) => {
        // res
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setDisabled(!disabled);
    timer = setInterval(() => {
      setTime((v) => {
        return v - 1;
      });
    }, 1000);
  };
  return (
    <View>
      <Button
        disabled={disabled}
        containerStyle={{borderRadius: 50, margin: 0}}
        titleStyle={{fontSize: 12, fontWeight: 'bold'}}
        title={
          disabled
            ? `${I18n.t('verificationCode.resend')}(${time}S)`
            : I18n.t('verificationCode.get')
        }
        onPress={() => {
          sendCode();
        }}
      />
    </View>
  );
}
