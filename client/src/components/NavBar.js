import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListContainer';

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

  render() {
    const { videoName, videoIcon, videoColor } = this.state;
    return (
      <Menu className="nav-bar" pointing>
        <FriendListItemContainer />
        <Menu.Item
          name={videoName}
          icon={videoIcon}
          color={videoColor}
          onClick={this.joinVideoChat}
          position="right"
        />
      </Menu>
    );
  }
}

export default NavBar;
