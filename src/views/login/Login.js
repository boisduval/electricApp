import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Container, Content, H1} from 'native-base';
import baseStyles from '../../assets/baseStyles';
import I18n from '../../../locales';
import {Button} from 'react-native-elements';
import NoticeComponent from '../../components/NoticeComponent';

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{justifyContent: 'space-between', flex: 1}}
          style={[baseStyles.contentBox]}>
          <View style={[styles.box]}>
            <H1 style={{fontWeight: 'bold', fontSize: 30, lineHeight: 80}}>
              {I18n.t('login.welcome')}
            </H1>
            <View style={styles.buttonBox}>
              <Button
                title={I18n.t('login.tab')[0]}
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={styles.buttonStyle}
                titleStyle={{fontWeight: 'bold'}}
                onPress={() => {
                  this.props.navigation.navigate('accountNumber');
                }}
              />
              <Button
                type="outline"
                title={I18n.t('login.tab')[1]}
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={[styles.buttonStyle, styles.buttonOutlineStyle]}
                titleStyle={{color: 'black'}}
                onPress={() => {
                  this.props.navigation.navigate('phoneNumber');
                }}
              />
            </View>
          </View>
          <NoticeComponent />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    paddingTop: 100,
  },
  buttonBox: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 60,
  },
  tipColor: {
    color: '#666',
  },
  buttonContainerStyle: {
    borderRadius: 10,
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

export default Login;
