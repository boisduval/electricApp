import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {
  CardItem,
  Container,
  Content,
  Left,
  Right,
  Item,
  Body,
} from 'native-base';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import store from '../redux';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import baseStyles from '../assets/baseStyles';
import ImageList from '../components/ImageList';
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
        if (res.data.code === 0 || 1) {
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
    };
  }

  render() {
    return (
      <Container>
        <Content>
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
          <Body style={{marginHorizontal: 20, alignItems: 'flex-start'}}>
            <Text>{this.state.detail}</Text>
            <ImageList imgArr={this.state.imgList} />
          </Body>
        </Content>
      </Container>
    );
  }
}

export default BlogDetail;
