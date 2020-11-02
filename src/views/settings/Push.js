import React from 'react';
import {Text, View, Switch, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

import baseStyles from '../../assets/baseStyles';

import I18n from '../../../locales/index';
import store from '../../redux';
import {setPushNotification} from '../../redux/actionCreators';

export default class Push extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pushNotificationSettings: '',
    };
  }
  render() {
    const list1 = [
      'faultNotificationOn',
      'securityNotificationOn',
      'serviceNotificationOn',
    ];
    const list2 = [
      'generalNotificationOn',
      'processNotificationOn',
      'feedbackNotificationOn',
    ];
    return (
      <View style={[baseStyles.tabViewBox]}>
        <ScrollView>
          <ReduxItem name="pushNotificationOn" />
          <Text style={styles.title}>{I18n.t('pushSettings.bicycle')}</Text>
          {list1.map((v, i) => (
            <ReduxItem key={i} name={v} />
          ))}
          <Text style={styles.title}>{I18n.t('pushSettings.system')}</Text>
          {list2.map((v, i) => (
            <ReduxItem key={i} name={v} />
          ))}
          <Text style={styles.title}>{I18n.t('pushSettings.active')}</Text>
          <ReduxItem name="activityNotificationOn" />
        </ScrollView>
      </View>
    );
  }
}

function Item(props) {
  const handleSwitch = (newState) => {
    store.dispatch(setPushNotification(newState, props.name));
  };

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{I18n.t('pushSettings.' + props.name)}</ListItem.Title>
      </ListItem.Content>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={props[props.name] ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleSwitch}
        value={props[props.name]}
      />
    </ListItem>
  );
}

const mapStateToProps = (state) => {
  const {pushNotificationSettings} = state;
  return pushNotificationSettings;
};

const mapDispatchToProps = (dispatch) => ({
  setPushNotification: (setPushNotificationAction) =>
    dispatch(setPushNotificationAction),
});

const ReduxItem = connect(mapStateToProps, mapDispatchToProps)(Item);

const styles = StyleSheet.create({
  title: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 14,
    marginTop: 14,
    marginBottom: 6,
  },
});
