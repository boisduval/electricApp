import React from 'react';

import baseStyles from '../../assets/baseStyles';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {Input, Item, Text, Textarea, ActionSheet} from 'native-base';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

export default class OnlineRepair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      userName: '',
      reason: '',
    };
  }
  render() {
    return (
      <View style={baseStyles.tabViewBox}>
        <ScrollView>
          <View style={baseStyles.contentBox}>
            <Text style={{padding: 10}}>v1版神车</Text>
            <Item regular>
              <Input placeholder="报修人姓名" />
            </Item>
            <Item regular style={{marginTop: 10}}>
              <Input
                onChangeText={(value) => {
                  this.setState({
                    phoneNumber: value,
                  });
                }}
                placeholder="报修人电话"
              />
            </Item>
            <Textarea
              style={{marginTop: 10}}
              rowSpan={5}
              bordered
              placeholder="请描述您的问题"
            />
            <View style={{marginTop: 10}}>
              <Text>上传图片(最多选择9张)</Text>
            </View>
            <ImageBox />
            <View style={{marginTop: 10}}>
              <Button title="提交" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const options = {
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class ImageBox extends React.Component {
  _renderAddImageView() {
    //判断state中是否存在图片路径信息，如果没有，就显示添加图片的按钮。
    console.info(this.state.avatarSource.length > 0);
    //pages 变量，用来存储，我们遍历出来的路径，生成的ImageBackground显示节点。
    var pages = [];
    if (this.state.avatarSource.size > 0) {
      let images = this.state.avatarSource;
      images.forEach((url, i) => {
        pages.push(
          <ImageBackground
            key={'img' + i}
            index={1}
            source={require('../../assets/imgs/dashed.png')}
            style={styles.image}>
            <ImageBackground source={{uri: url}} style={styles.uploadImage} />
            <TouchableOpacity
              style={styles.rightDelButton}
              onPress={() => this.deleteLoadedImage(url)}>
              <Image
                style={{width: 20, height: 20}}
                // onPress={() => alert(23)}
                source={require('../../assets/imgs/delete.png')}
              />
            </TouchableOpacity>
          </ImageBackground>,
        );
      });
      //注意这里，如果图片数量小于9，那么我们需要显示可以继续添加。
      if (this.state.avatarSource.size < 9) {
        pages.push(
          <ImageBackground
            key="add"
            source={require('../../assets/imgs/dashed.png')}
            style={styles.image}>
            <TouchableOpacity onPress={this.addOnClicked.bind(this)}>
              <Image
                style={{width: 60, height: 60}}
                source={require('../../assets/imgs/add.png')}
              />
            </TouchableOpacity>
          </ImageBackground>,
        );
      }
      return pages;
    } else {
      pages.push(
        <ImageBackground
          key="add"
          source={require('../../assets/imgs/dashed.png')}
          style={styles.image}>
          <TouchableOpacity onPress={this.addOnClicked.bind(this)}>
            <Image
              style={{width: 60, height: 60}}
              source={require('../../assets/imgs/add.png')}
            />
          </TouchableOpacity>
        </ImageBackground>,
      );
      return pages;
    }
  }

  addOnClicked() {
    // 选择摄像头或者照片
    var BUTTONS = ['拍摄', '从相册选择', '取消'];
    var DESTRUCTIVE_INDEX = 0;
    var CANCEL_INDEX = 2;
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.openCamera({
              multiple: true,
            }).then((images) => {
              console.log(images);
            });
            break;
          case 1:
            ImagePicker.openPicker({
              multiple: true,
            }).then((images) => {
              let temp = this.state.avatarSource;
              for (const image of images) {
                temp.add(image.path);
              }
              this.setState({
                avatarSource: temp,
              });
            });
        }
      },
    );
  }

  //删除加载的图片
  deleteLoadedImage(url) {
    let imageUrls;
    imageUrls = this.state.avatarSource;
    //从set中删除掉url
    imageUrls.delete(url);
    //重新刷新视图
    this.setState({avatarSource: imageUrls});
  }

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: new Set(),
    };
  }

  render() {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          //重点,这个方法负责添加我们的图片。
          this._renderAddImageView()
        }
      </View>
    );
  }
}

// const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  normalTitle: {
    textAlign: 'center',
  },
  normalText: {
    textAlign: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth / 3 - 30,
    height: deviceWidth / 3 - 30,
    marginLeft: 10,
    marginTop: 10,
  },
  uploadImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth / 3 - 40,
    height: deviceWidth / 3 - 40,
  },
  rightDelButton: {
    position: 'absolute',
    top: -5,
    left: deviceWidth / 3 - 40,
    margin: -1,
    flexDirection: 'row-reverse',
  },
});
