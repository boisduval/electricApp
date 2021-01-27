import React from 'react';
import {Body, Button, Card, CardItem, Left, Right} from 'native-base';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Icon, Image} from 'react-native-elements';
import * as RootNavigation from '../../RootNavigation';
import {Dimensions} from 'react-native';
import ImageList from '../ImageList';

const width = Dimensions.get('window').width - 65;
const imgWidth = (Dimensions.get('window').width - 100) / 3;

class Item extends React.Component {
  componentDidMount() {
    Image.prefetch(
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
    ).then((res) => {
      console.log(res);
    });
  }

  render() {
    const data = this.props.data;
    const path = this.props.path;
    return (
      <Card>
        {/*  header  */}
        <CardItem>
          <Left>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/*<UserAvatar size="small" />*/}
              {(() => {
                if (data.user.img === '') {
                  return (
                    <Avatar
                      size="small"
                      rounded
                      title={data.user.name.substr(0, 1)}
                      overlayContainerStyle={{backgroundColor: '#BCBEC1'}}
                    />
                  );
                } else {
                  return (
                    <Avatar
                      size="small"
                      rounded
                      source={{
                        uri: data.user.img,
                      }}
                    />
                  );
                }
              })()}
              <Text style={{marginLeft: 6}}>{data.user.name}</Text>
            </View>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={() => {
                console.log('ok');
              }}>
              <Icon name="ellipsis-horizontal" type="ionicon" size={22} />
              {/*<Text>123</Text>*/}
            </TouchableOpacity>
          </Right>
        </CardItem>
        <TouchableOpacity
          onPress={() => {
            RootNavigation.navigate('blogDetail', {
              id: data.VOSystemID,
              path: path,
            });
          }}>
          <CardItem>
            {/* 内容 */}
            {/* 是否只显示一部分 */}
            {/* 超出部分省略号 */}
            <Body>
              <Text>{this.props.data.details}</Text>
            </Body>
          </CardItem>
        </TouchableOpacity>
        <CardItem
          cardBody
          style={{
            marginHorizontal: 15,
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}>
          <ImageList imgArr={data.imgs} />
          {/* 根据图片数量 */}
          {/* 最大数量9 */}
          {/*1. 1张*/}
          {/*2. 2/4/6张*/}
          {/*3. 3/5/7/8/9张*/}
          {/*{(() => {*/}
          {/*  let temp = data.imgs.length;*/}
          {/*  // temp = 9;*/}
          {/*  // let arr = new Array(9).fill('');*/}
          {/*  // console.log(arr);*/}
          {/*  switch (temp) {*/}
          {/*    case 0:*/}
          {/*      return undefined;*/}
          {/*    case 1:*/}
          {/*      return (*/}
          {/*        <Image*/}
          {/*          containerStyle={{marginTop: 10, marginHorizontal: 5}}*/}
          {/*          source={{*/}
          {/*            uri:*/}
          {/*              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',*/}
          {/*          }}*/}
          {/*          style={{height: width, width: width}}*/}
          {/*        />*/}
          {/*      );*/}
          {/*    case 2:*/}
          {/*    case 4:*/}
          {/*    case 6:*/}
          {/*      return (*/}
          {/*        <View style={{flexDirection: 'row'}}>*/}
          {/*          <View*/}
          {/*            style={{*/}
          {/*              flexDirection: 'row',*/}
          {/*              flex: 2,*/}
          {/*              justifyContent: 'flex-start',*/}
          {/*              flexWrap: 'wrap',*/}
          {/*            }}>*/}
          {/*            {data.imgs.map((v, i) => (*/}
          {/*              <Image*/}
          {/*                key={i}*/}
          {/*                containerStyle={{marginTop: 10, marginHorizontal: 5}}*/}
          {/*                source={{*/}
          {/*                  uri: v,*/}
          {/*                }}*/}
          {/*                style={{height: imgWidth, width: imgWidth}}*/}
          {/*              />*/}
          {/*            ))}*/}
          {/*          </View>*/}
          {/*          <View*/}
          {/*            style={{*/}
          {/*              flex: 1,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*      );*/}
          {/*    case 3:*/}
          {/*    case 5:*/}
          {/*    case 7:*/}
          {/*    case 8:*/}
          {/*    case 9:*/}
          {/*      return data.imgs.map((v, i) => (*/}
          {/*        <Image*/}
          {/*          key={i}*/}
          {/*          containerStyle={{marginTop: 10, marginHorizontal: 5}}*/}
          {/*          source={{*/}
          {/*            uri: v,*/}
          {/*          }}*/}
          {/*          style={{height: imgWidth, width: imgWidth}}*/}
          {/*        />*/}
          {/*      ));*/}
          {/*  }*/}
          {/*})()}*/}
        </CardItem>
        <CardItem>
          <Left>
            <Text style={{color: '#666', fontSize: 12}}>{data.dtime}</Text>
          </Left>
          <Right>
            <View style={{flexDirection: 'row'}}>
              <Button
                transparent
                iconLeft
                onPress={() => {
                  RootNavigation.navigate('blogDetail', {
                    id: data.VOSystemID,
                    path: path,
                  });
                }}>
                <Icon
                  name="chatbubble-ellipses"
                  type="ionicon"
                  color="#666"
                  size={18}
                />
                <Text style={{marginLeft: 4, fontSize: 10, color: '#666'}}>
                  {data.replies}
                </Text>
              </Button>
              <Button
                transparent
                iconLeft
                style={{marginLeft: 10}}
                onPress={() => {
                  this.props.setStar(
                    data.systemid,
                    data.likestatus === 0 ? 1 : 0,
                  );
                }}>
                <Icon
                  name="heart"
                  type="ionicon"
                  color={data.likestatus === 0 ? '#666' : '#FE180D'}
                  size={18}
                />
                <Text style={{marginLeft: 4, fontSize: 10, color: '#666'}}>
                  {data.thumbup}
                </Text>
              </Button>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default Item;
