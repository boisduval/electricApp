import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from '../../locales';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import PropTypes from 'prop-types';
import store from '../redux';
import {resolve} from 'react-native-svg/src/lib/resolve';

let timer;
export default function SendVerificationCodeButton(props) {
  const [disabled, setDisabled] = React.useState(false);
  const [time, setTime] = React.useState(60);
  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer);
      setDisabled(false);
      setTime(60);
    }
    return () => {
      clearInterval(timer);
    };
  }, [time]);
  const sendCode = () => {
    //  发送验证码
    axios
      .get(`${baseUrl.url1}/Verification/GetLoginVerificationCode`, {
        params: {
          Prefix: props.Prefix,
          Phone: props.Phone,
        },
      })
      .then((res) => {
        // res
        const {
          data: {data},
        } = res;
        props.setIdentificationCode(data.IdentificationCode);
        console.log(data);
        setDisabled(!disabled);
        timer = setInterval(() => {
          setTime((v) => {
            return v - 1;
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <Button
        disabled={disabled || props.disabled}
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

SendVerificationCodeButton.propTypes = {
  Prefix: PropTypes.string.isRequired,
  Phone: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
