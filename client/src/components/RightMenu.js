import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import GroupChatContainer from '../containers/GroupChatContainer';

class RightMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: true,
      activeItem: 'tab1' 
    };
  }

  handleClick(e, { name }) {
    // do things to the state of the app inherited as props
  }

  render() {
    const { visible } = this.state
    return (
      <Sidebar as={Menu} direction='right' animation='push' width='thin' visible={visible} icon='labeled' vertical inverted color='black' >
        <Menu.Item name='mail'>
          <Icon name='video' />
          Video Chat
        </Menu.Item>
        <Menu.Item >
          <Menu.Header>Live Streaming</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <GroupChatContainer />
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default RightMenu;