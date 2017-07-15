import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import TextChannelList from './TextChannelList';

class LeftMenu extends Component {
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
      <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted color='grey' fixed="left">
        <Menu.Item name='mail' onClick={this.handleClick.bind(this)}>
          <Icon name='user' />
          INSERT USER PHOTO
        </Menu.Item>
        <Menu.Item >
          <Menu.Header>Text Channels</Menu.Header>
          <TextChannelList />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>
            Direct Messages
          </Menu.Header>
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default LeftMenu;