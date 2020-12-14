import React from 'react';
import {Card, Icon, ListItem} from 'react-native-elements';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class CubeItem extends React.Component {
  render() {
    return (
      <Card
        containerStyle={{
          margin: 8,
          borderRadius: 4,
          borderWidth: 0,
          padding: 0,
        }}>
        <ListItem
          containerStyle={{
            backgroundColor: '#ccc',
            borderRadius: 4,
            borderWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 8,
          }}
          onPress={() => {
            this.props.navigate(this.props.path);
          }}>
          <View style={styles.cardItem}>
            <View style={[styles.cardItemLeft]}>
              <Text style={{fontSize: 16, color: '#666'}}>
                {this.props.title}
              </Text>
              <Text style={{fontSize: 12, color: '#666'}}>
                {this.props.subtitle}
              </Text>
            </View>
            <View style={[styles.cardSize, styles.cardItemRight]}>
              <Icon
                name={this.props.icon}
                type={this.props.type}
                size={48}
                color="#fff"
              />
            </View>
          </View>
        </ListItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  cardSize: {
    flex: 1,
  },
  cardItemRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardItemLeft: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
