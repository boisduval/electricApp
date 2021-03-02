/*
 * 单体电芯信息组件
 * */
import React from 'react';
import {Text, View, RefreshControl, FlatList} from 'react-native';
import baseStyles from '../assets/baseStyles';
import {ListItem} from 'react-native-elements';
import axios from '../assets/utils/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import Loading from '../components/Loading';
import Toast from 'react-native-root-toast';
import bicycleInfoList from '../assets/styles/bicycleInfoList';
import BatteryListHeader from './BatteryListHeader';
import PropType from 'prop-types';

class CellInfo extends React.Component {
  getData(toast) {
    axios
      .get(`${baseUrl.url1}/Vehicle/${this.props.url}`, {
        params: {
          AutoSystemID: store.getState().userId,
        },
      })
      .then((res) => {
        // res
        if (res) {
          const {
            data: {data},
          } = res;
          this.setState({
            list: data[this.props.listKey],
            title:
              data[this.props.titleKey].name +
              '    ' +
              data[this.props.titleKey].value +
              data[this.props.titleKey].unit,
            subtitle:
              data[this.props.subtitleKey].name +
              '    ' +
              data[this.props.subtitleKey].value +
              data[this.props.subtitleKey].unit,
            value: data[this.props.valueKey].value,
            unit: data[this.props.valueKey].unit,
          });
        } else {
          this.setState({
            list: [],
            title: '',
            subtitle: '',
            value: '',
            unit: '',
          });
        }
        this.setState({
          refreshing: false,
        });
        if (toast) {
          setTimeout(() => {
            Toast.hide(toast);
          }, 200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onRefresh() {
    if (this.state.refreshing === false) {
      this.setState({
        refreshing: true,
      });
      let toast = Toast.show(Loading(), {
        position: Toast.positions.CENTER, // toast位置
      });
      this.getData(toast);
    }
  }

  componentDidMount() {
    this.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      title: '',
      subtitle: '',
      value: '',
      unit: '',
      refreshing: false,
    };
  }
  render() {
    const title = this.state.title;
    const subtitle = this.state.subtitle;
    const rightComponent = (
      <View style={{alignItems: 'flex-end'}}>
        <Text style={[bicycleInfoList.listItem, {fontSize: 24}]}>
          {this.state.value}
        </Text>
        <Text style={[bicycleInfoList.listItem, {fontSize: 20}]}>
          {this.state.unit}
        </Text>
      </View>
    );
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <BatteryListHeader
            title={title}
            subtitle={subtitle}
            rightComponent={rightComponent}
          />
        }
        ListFooterComponent={<View style={{height: 20}} />}
        data={this.state.list}
        renderItem={({item}) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.explain}</ListItem.Subtitle>
            </ListItem.Content>
            <View>
              <Text>
                {item.value}
                {item.unit}
              </Text>
            </View>
          </ListItem>
        )}
        style={[baseStyles.tabViewBox, {paddingHorizontal: 10, marginTop: 10}]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
    );
  }
}
CellInfo.propTypes = {
  url: PropType.string.isRequired,
  titleKey: PropType.string.isRequired,
  subtitleKey: PropType.string.isRequired,
  valueKey: PropType.string.isRequired,
  listKey: PropType.string.isRequired,
};

export default CellInfo;
