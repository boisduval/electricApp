/* 九宫格图片展示组件 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Overlay} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageItem from './ImageItem';

//  1张图时的宽高
//  1. 横图16:9
//  2. 竖图
//  3. 正方形
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const width = screenWidth - 65;
const height = (width * 9) / 16;
const imgWidth = (Dimensions.get('window').width - 100) / 3;

class ImageList extends React.Component {
  toggleOverlay() {
    this.setState({
      visible: true,
      index: 0,
    });
  }
  setIndex(index) {
    this.setState({
      index: index,
    });
    console.log(this.state.index);
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    const imgArr = this.props.imgArr;
    const images = imgArr.map((v, i) => {
      return {
        url: '',
        props: {
          uri: v.Original,
          width: v.Width,
          height: v.Height,
        },
      };
    });

    return (
      <>
        {(() => {
          switch (imgArr.length) {
            // 根据图片数量
            //   最大数量9
            //   1. 1张
            //   2. 2/4/6张
            //   3. 3/5/7/8/9张
            case 0:
              return undefined;
            case 1:
              return (
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => {
                    this.toggleOverlay();
                    this.setIndex(0);
                  }}>
                  {(() => {
                    if (imgArr[0].Height > imgArr[0].Width) {
                      {
                        /* 竖屏 */
                      }
                      return (
                        <ImageItem
                          uri={imgArr[0].Thumbnail}
                          width={height}
                          height={width}
                        />
                      );
                    } else if (imgArr[0].Height < imgArr[0].Width) {
                      return (
                        <ImageItem
                          uri={imgArr[0].Thumbnail}
                          width={width}
                          height={height}
                        />
                      );
                    } else {
                      return (
                        <ImageItem
                          uri={imgArr[0].Thumbnail}
                          width={height}
                          height={height}
                        />
                      );
                    }
                  })()}
                  {/* 横屏 */}
                </TouchableOpacity>
              );
            case 2:
            case 4:
            case 6:
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 2,
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    {imgArr.map((v, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          this.toggleOverlay();
                          this.setIndex(i);
                        }}>
                        <View style={{marginTop: 10, marginHorizontal: 4}}>
                          <ImageItem
                            uri={v.Thumbnail}
                            width={imgWidth}
                            height={imgWidth}
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                </View>
              );
            case 3:
            case 5:
            case 7:
            case 8:
            case 9:
              return imgArr.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.toggleOverlay();
                    this.setIndex(i);
                  }}>
                  <View style={{marginTop: 10, marginHorizontal: 4}}>
                    <ImageItem
                      uri={v.Thumbnail}
                      width={imgWidth}
                      height={imgWidth}
                    />
                  </View>
                </TouchableOpacity>
              ));
          }
        })()}
        <ImageOverlay
          images={images}
          visible={this.state.visible}
          toggleOverlay={this.toggleOverlay.bind(this)}
          index={this.state.index}
        />
      </>
    );
  }
}

// 原图遮罩层
class ImageOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
    };
  }
  render() {
    console.log(this.props.images);

    return (
      <Overlay
        isVisible={this.props.visible}
        backdropStyle={{backgroundColor: 'black'}}
        overlayStyle={{backgroundColor: 'black'}}
        fullScreen={true}
        onBackdropPress={this.props.toggleOverlay}>
        <ImageViewer
          imageUrls={this.props.images}
          renderImage={(props) => (
            <Image
              style={{
                width: 400,
                height: 400,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}
              resizeMode="contain"
              source={{uri: props.uri}}
            />
          )}
        />
      </Overlay>
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

ImageList.propTypes = {
  imgArr: PropTypes.array.isRequired,
};

export default ImageList;
