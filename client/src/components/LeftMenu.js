import React, { Component } from 'react';
import { Sidebar, Menu, Image, Icon, Header, Label } from 'semantic-ui-react';

import RoomContainer from '../containers/RoomContainer';
import ChannelContainer from '../containers/ChannelContainer';
import DirectMessageListContainer from '../containers/DirectMessageListContainer';

class LeftMenu extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { fetchDirects, user } = this.props;
    fetchDirects(user.id);
  }

  getDirectMessage() {
    const { directs } = this.props;
    return directs && Object.keys(directs).length
      ? <DirectMessageListContainer />
      : <p>Start conversations...</p>;
  }

  render() {
    const { user } = this.props;
    return (
      <Sidebar
        className="left-sidebar"
        as={Menu}
        visible="true"
        icon="labeled"
        vertical
        inverted
      >
        <Menu.Item>
          <Image src={user.image} size="tiny" shape="circular" centered />
          <br />
          <Menu.Header>
            {user.first}
          </Menu.Header>
          <a href="/logout">Log Out</a>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Rooms</Menu.Header>
          <RoomContainer />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Channels</Menu.Header>
          <ChannelContainer />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Direct Messages</Menu.Header>
          <br />
          {this.getDirectMessage()}
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default LeftMenu;
