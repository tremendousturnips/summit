import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoName: 'join video chat',
      videoIcon: 'video play',
      videoColor: 'green'
    };

    this.joinVideoChat = this.joinVideoChat.bind(this);
    this.handleFriends = this.handleFriends.bind(this);
  }

  joinVideoChat() {
    this.props.toggleVideoStat();
    this.setState(
      this.props.toggleVideo
        ? {
          videoName: 'join video chat',
          videoIcon: 'video play',
          videoColor: 'green'
        }
        : {
          videoName: 'leave video chat',
          videoIcon: 'stop circle',
          videoColor: 'red'
        }
    );
  }

  handleFriends() {
    this.props.showFriendListStat();
  }

  render() {
    return (
      <Menu id="nav-bar" pointing>
        <Menu.Item name="friends" onClick={this.handleFriends} />
        <Menu.Item
          name={this.state.videoName}
          icon={this.state.videoIcon}
          color={this.state.videoColor}
          onClick={this.joinVideoChat}
          position="right"
        />
      </Menu>
    );
  }
}

export default NavBar;
