/*
 * 封装图像组件
 * 未加载完成时灰色背景占位
 * 加载失败时显示失败图像
 * */
import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import PropTypes, {number, object} from 'prop-types';

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
    };
  }
  render() {
    return (
      <View
        style={[
          this.state.isLoading
            ? styles.onLoadBackground
            : styles.loadedBackground,
          {flex: 1},
        ]}>
        <FastImage
          style={{
            width: this.props.width,
            height: this.props.height,
            flex: 1,
          }}
          onLoadStart={() => {
            this.setState({isLoading: true, isError: false});
          }}
          onLoadEnd={() => {
            this.setState({isLoading: false, isError: false});
          }}
          onError={() => {
            this.setState({isError: true});
          }}
          source={{
            uri: this.props.uri,
            // uri: v.Thumbnail,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode[this.props.resizeMode || 'cover']}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  onLoadBackground: {
    backgroundColor: '#ccc',
  },
  loadedBackground: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
ImageItem.propTypes = {
  uri: PropTypes.string.isRequired,
  resizeMode: PropTypes.oneOf(['cover', 'contain']),
};
export default ImageItem;
