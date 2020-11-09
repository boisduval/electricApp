import React from 'react';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';

class UserAvatarComponent extends React.Component {
  render() {
    return (
      <Avatar
        size={this.props.size || 'medium'}
        rounded
        title={this.props.userInformation.username}
        overlayContainerStyle={{backgroundColor: '#BCBEC1'}}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {userInformation} = state;
  return {userInformation};
};

const UserAvatar = connect(mapStateToProps)(UserAvatarComponent);

export default UserAvatar;
