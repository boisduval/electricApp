import React from 'react';
import {Container, Content} from 'native-base';
import {SearchBar, Icon} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import baseStyles from '../assets/baseStyles';
import * as baseConstant from '../assets/baseConstant';
import I18n from '../../locales';

class Search extends React.Component {
  updateSearch = (search) => {
    this.setState({search});
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  render() {
    return (
      <Container>
        <Content>
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              },
            ]}>
            <SearchBar
              containerStyle={{
                flex: 1,
                backgroundColor: '#fff',
                borderBottomWidth: 0,
                borderTopWidth: 0,
              }}
              inputContainerStyle={{
                backgroundColor: '#DCDCE1',
              }}
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}
              round
              lightTheme
              showCancel={true}
              platform="default"
              onClear={() => {
                this.setState({search: ''});
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Text style={{color: baseConstant.blue}}>
                {I18n.t('button.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Search;
