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
  }

  joinVideoChat() {
    console.log('In NavBar joinVideoChat');
    this.props.toggleVideoStat();
    console.log('this.props.toggleVideo', this.props.toggleVideo);
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

  render() {
    return (
      <Menu id="nav-bar" pointing>
        <Menu.Item name="home" />
        <Menu.Item name="messages" />
        <Menu.Item name="friends" />
        <Menu.Menu position="right">
          <Menu.Item
            name={this.state.videoName}
            icon={this.state.videoIcon}
            color={this.state.videoColor}
            onClick={this.joinVideoChat}
          />
          <Menu.Item>
            <Input icon="users" iconPosition="left" placeholder="Search users..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
