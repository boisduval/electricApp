import React from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Container, Content, Body, Footer} from 'native-base';
import axios from 'assets/utils/http';
import baseUrl from 'assets/baseUrl';
import store from 'src/redux';
import {Avatar, Icon, Input, ListItem} from 'react-native-elements';
import ImageList from 'components/ImageList';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    props: {uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    props: {uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    props: {uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
  },
];

class BlogDetail extends React.Component {
  getData() {
    const id = this.props.route.params.id;
    const path = this.props.route.params.path;
    axios
      .get(`${baseUrl.url1}/Community/${path}`, {
        params: {
          AutoSystemID: store.getState().userId,
          DetailsSystemID: '637139473276800245',
        },
      })
      .then((res) => {
        // res
        if (res) {
          const {
            data: {data},
          } = res;
          let temp = data.Imgs.map((v) => {
            return {
              url: v.Original,
              props: {
                uri: v.Original,
              },
            };
          });
          this.setState({
            author: data.Master,
            writeTime: data.WriteTime,
            read: data.ReadNum,
            detail: data.Derails,
            imgList: data.Imgs,
            images: temp,
            replies: data.Repliess,
          });
          console.log(this.state.images);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  constructor(props) {
    super(props);
    this.state = {
      author: {
        name: '',
        img: '',
      },
      writeTime: '',
      read: '',
      detail: '',
      imgList: [],
      images: [],
      comment: '',
      replies: [],
    };
  }

  render() {
    return (
      <Container>
        <Content style={{marginBottom: 20}}>
          <Modal visible={false} transparent={true}>
            <ImageViewer
              imageUrls={images}
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
          </Modal>
          <ListItem>
            {(() => {
              if (this.state.author.img === '') {
                return (
                  <Avatar
                    size="small"
                    rounded
                    title={this.state.author.name.substr(0, 1)}
                    overlayContainerStyle={{backgroundColor: '#BCBEC1'}}
                  />
                );
              } else {
                return (
                  <Avatar
                    size="small"
                    rounded
                    source={{
                      uri: this.state.author.img,
                    }}
                  />
                );
              }
            })()}
            <ListItem.Content>
              <ListItem.Title>{this.state.author.name}</ListItem.Title>
              <ListItem.Subtitle>{this.state.writeTime}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
              onPress={() => {
                console.log('ok');
              }}>
              <Icon name="ellipsis-horizontal" type="ionicon" size={22} />
              {/*<Text>123</Text>*/}
            </TouchableOpacity>
          </ListItem>
          <Body
            style={{
              marginHorizontal: 20,
              alignItems: 'flex-start',
            }}>
            {/* 文章  */}
            <Text>{this.state.detail}</Text>
            <Text>{this.state.detail}</Text>
            {/* 图片  */}
            <ImageList imgArr={this.state.imgList} />
          </Body>
          {/*  阅读数  */}
          <View style={styles.readBox}>
            <Text style={styles.readText}>{this.state.read}</Text>
          </View>
          <View style={{backgroundColor: '#e2e2e2', height: 10}} />
          {/*  评论和赞  */}
          <View>
            {this.state.replies.map((v, i) => (
              <ListItem bottomDivider key={i}>
                <Avatar
                  size="small"
                  rounded
                  source={{
                    uri: v.UserInfo.img,
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>{v.UserInfo.name}</ListItem.Title>
                  <Text>{v.Details}</Text>
                  <ListItem.Subtitle>{v.WriteTime}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </Content>
        <Footer style={{backgroundColor: '#ffffff'}}>
          <Input
            placeholder="Comment"
            style={{
              borderRadius: 14,
              backgroundColor: '#DCDCE1',
              flex: 1,
            }}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={(value) => this.setState({comment: value})}
          />
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  readBox: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  readText: {
    fontSize: 14,
    color: '#666',
  },
});

export default BlogDetail;
