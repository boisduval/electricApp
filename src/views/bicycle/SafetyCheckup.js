import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import baseStyles from '../../assets/baseStyles';
import {Button, ListItem} from 'react-native-elements';
import UserAvatar from '../../components/UserAvatar';
import * as baseConstant from '../../assets/baseConstant';

export default class SafetyCheckup extends React.Component {
  render() {
    const list = [
      {
        title: '落锁告警',
        subtitle: '检测到一个安全风险',
        content: '监测到您的爱车未落锁，请确认是否安全',
        description: '如果您在行车，友情提醒，骑行时注意安全！',
        operation: 'lock',
      },
      {
        title: '落锁告警',
        subtitle: '检测到一个安全风险',
        content: '监测到您的爱车未落锁，请确认是否安全',
        description: '如果您在行车，友情提醒，骑行时注意安全！',
        operation: null,
      },
    ];
    return (
      <ScrollView style={baseStyles.tabViewBox}>
        <View style={baseStyles.contentBox}>
          <Box />
          {list.map((v, i) => (
            <Item
              key={i}
              title={v.title}
              subtitle={v.subtitle}
              content={v.content}
              description={v.description}
              operation={v.operation}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

class Box extends React.Component {
  render() {
    return (
      <ListItem containerStyle={styles.list}>
        <UserAvatar size="medium" />
        <ListItem.Content>
          <ListItem.Title style={{color: '#666'}}>问题数量 1</ListItem.Title>
          <ListItem.Subtitle style={{color: '#666'}}>
            体检分数 98分
          </ListItem.Subtitle>
        </ListItem.Content>
        {/*<View>*/}
        {/*  <Text>1234</Text>*/}
        {/*  <Text>km</Text>*/}
        {/*</View>*/}
      </ListItem>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <View style={styles.item}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <Text style={styles.subTitleText}>{this.props.subtitle}</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.contentText}>{this.props.content}</Text>
            <Text style={styles.descriptionText}>{this.props.description}</Text>
          </View>
          {(() => {
            if (this.props.operation && this.props.operation === 'lock') {
              return (
                <View style={{justifyContent: 'center'}}>
                  <Button
                    title="落锁"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                  />
                </View>
              );
            }
          })()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
  },
  title: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  titleText: {
    color: '#666',
    fontSize: 16,
  },
  subTitleText: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  contentText: {
    fontSize: 14,
  },
  descriptionText: {
    color: '#666',
    fontSize: 12,
  },
  button: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderColor: '#666',
  },
  buttonTitle: {
    fontSize: 12,
    color: '#666',
  },
  list: {
    backgroundColor: '#f2f2f2',
    borderWidth: 0,
    borderRadius: 4,
    marginVertical: 10,
  },
});
