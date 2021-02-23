/*
 * 车辆信息头部面板
 * 车辆信息列表
 * */
import {StyleSheet} from 'react-native';

const bicycleInfoList = StyleSheet.create({
  list: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    height: '100%',
  },
  listItem: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContent: {justifyContent: 'space-around', height: '100%'},
});

export default bicycleInfoList;
