import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
        if (res.data.code === 0) {
          const {
            data: {data},
          } = res;
          this.setState({
            author: data.Master,
            writeTime: data.WriteTime,
            read: data.ReadNum,
            detail: data.Derails,
            imgList: data.Imgs,
          });
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
    };
  }

  render() {
    return (
      <Container>
        <Content>
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
          <Body style={{marginHorizontal: 20}}>
            <Text>{this.state.detail}</Text>
            <ImageList imgArr={this.state.imgList} />
          </Body>
        </Content>
      </Container>
    );
  }
}

export default BlogDetail;
