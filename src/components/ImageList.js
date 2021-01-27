import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import {CardItem} from 'native-base';
import FastImage from 'react-native-fast-image';
import Item from './community/Item';

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
              return <ImageItem key={i} uri={imgArr[0].Thumbnail} />;
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
                      <ImageItem key={i} uri={v.Thumbnail} />
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
                <ImageItem key={i} uri={v.Thumbnail} />
              ));
          }
        })()}
      </>
    );
  }
}

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  render() {
    return (
      <View
        style={[
          this.state.isLoading
            ? styles.onLoadBackground
            : styles.loadedBackground,
          {marginTop: 10, marginHorizontal: 5},
        ]}>
        <FastImage
          style={{
            width: imgWidth,
            height: imgWidth,
          }}
          onLoadStart={() => {
            this.setState({isLoading: true});
          }}
          onLoadEnd={() => {
            this.setState({isLoading: false});
          }}
          source={{
            uri: this.props.uri,
            // uri: v.Thumbnail,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
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

ImageList.propTypes = {
  imgArr: PropTypes.array.isRequired,
};

export default ImageList;
