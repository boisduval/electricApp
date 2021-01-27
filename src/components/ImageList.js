import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View} from 'react-native';
import {Image} from 'react-native-elements';
import {CardItem} from 'native-base';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width - 65;
const imgWidth = (Dimensions.get('window').width - 100) / 3;

class ImageList extends React.Component {
  render() {
    const imgArr = this.props.imgArr;
    // let temp = imgArr;
    // temp = 9;
    // let arr = new Array(9).fill('');
    // console.log(arr);
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
                <Image
                  containerStyle={{marginTop: 10, marginHorizontal: 5}}
                  source={{
                    uri: imgArr[0].Thumbnail,
                  }}
                  style={{height: width, width: width}}
                />
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
                      // <Image
                      //   key={i}
                      //   containerStyle={{marginTop: 10, marginHorizontal: 5}}
                      //   source={{
                      //     uri: v.Thumbnail,
                      //   }}
                      //   style={{height: imgWidth, width: imgWidth}}
                      // />
                      <FastImage
                        style={{
                          width: imgWidth,
                          height: imgWidth,
                          marginTop: 10,
                          marginHorizontal: 5,
                        }}
                        key={i}
                        onLoadStart={()=>{}}
                        source={{
                          uri:
                            'https://pic4.zhimg.com/v2-40dabfb2839565c7b3843f21695f5b9e_1440w.jpg?source=172ae18b',
                          // uri: v.Thumbnail,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
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
                <Image
                  key={i}
                  containerStyle={{marginTop: 10, marginHorizontal: 5}}
                  source={{
                    uri: v.Thumbnail,
                  }}
                  style={{height: imgWidth, width: imgWidth}}
                />
              ));
          }
        })()}
      </>
    );
  }
}

ImageList.propTypes = {
  imgArr: PropTypes.array.isRequired,
};

export default ImageList;
