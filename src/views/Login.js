import React from 'react';
import {Container, Content, Form, Item, Label, Input} from 'native-base';
import {Button, Text} from 'react-native-elements';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

import baseStyles from '../assets/baseStyles';

export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <Content style={baseStyles.contentBox}>
          <View style={{alignItems: 'center'}}>
            <Text h4 style={{marginTop: 80, color: '#666'}}>
              账号密码登录
            </Text>
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <View style={{marginHorizontal: 20, marginTop: 40}}>
            <Button title="登录" />
          </View>
          <View></View>
        </Content>
      </Container>
    );
  }
}
