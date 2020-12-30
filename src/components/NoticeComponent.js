import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from '../../locales';
import Link from './Link';
import PropTypes from 'prop-types';

export default class NoticeComponent extends React.Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        {(() => {
          if (this.props.registerTipShown) {
            return (
              <Text style={styles.tipColor}>{I18n.t('login.tip')[2]}</Text>
            );
          } else {
            return undefined;
          }
        })()}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.tipColor}>{I18n.t('login.tip')[0]}</Text>
          <Link text={I18n.t('nav.agreement')} path="agreement" />
          <Text style={styles.tipColor}>{I18n.t('login.tip')[1]}</Text>
          <Link text={I18n.t('nav.privacy')} path="privacy" />
        </View>
      </View>
    );
  }
}

NoticeComponent.propTypes = {
  registerTipShown: PropTypes.bool,
};

NoticeComponent.defaultProps = {
  registerTipShown: true,
};

const styles = StyleSheet.create({
  tipColor: {
    color: '#666',
    fontSize: 12,
  },
});
