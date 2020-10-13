import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
// import I18n from '../../../locales/i18n';
import I18n from 'i18n-js';

import baseStyles from '../../assets/baseStyles';
import * as baseConstant from '../../assets/baseConstant';

import * as actionCreator from '../../redux/actionCreators';

// 默认英文
let currentKey = 1;

class Language extends Component {
  languageCodeToKey(languageCode) {
    switch (languageCode) {
      case 'zh':
        return 0;
      case 'en':
        return 1;
      default:
        return 1;
    }
  }
  setLanguage(key, prop) {
    switch (key) {
      case 0:
        prop(actionCreator.setLanguage('zh'));
        break;
      case 1:
        prop(actionCreator.setLanguage('en'));
        break;
    }
  }
  render() {
    const currentLanguageKey = this.languageCodeToKey(
      this.props.userSetLanguage,
    );
    const list = [
      {
        key: 0,
        text: '简体中文',
      },
      {
        key: 1,
        text: 'English',
      },
    ];
    return (
      <View style={[baseStyles.tabViewBox]}>
        {list.map((v, i) => {
          const isCurrentLanguage = currentLanguageKey === v.key;
          return (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => this.setLanguage(v.key, this.props.setLanguage)}>
              <ListItem.Content>
                <ListItem.Title>{v.text}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                name="check"
                color={isCurrentLanguage ? baseConstant.blue : '#fff'}
              />
            </ListItem>
          );
        })}
        <Text>{I18n.t('nav.my')}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {userSetLanguage} = state;
  return {userSetLanguage};
};

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (setLanguageAction) => dispatch(setLanguageAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);
