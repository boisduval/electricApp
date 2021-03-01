/*
 * 圆形进度条的banner
 * */
import {StyleSheet} from 'react-native';

const circleProgressBanner = StyleSheet.create({
  circleProgressBox: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#003762',
  },
  barChartBox: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default circleProgressBanner;
