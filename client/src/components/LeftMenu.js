import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import ChannelList from './ChannelList';
import DirectMessageList from './DirectMessageList';

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: true,
      activeItem: 'tab1' 
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchChannels(1);
  }

  handleClick(e, { name }) {
    // do things to the state of the app inherited as props
  }

  render() {
    const { visible } = this.state;
    const { channels } = this.props;
    return (
      <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted color='grey' fixed="left">
        <Menu.Item name='mail' onClick={this.handleClick.bind(this)}>
          <Icon name='user' />
          INSERT USER PHOTO
        </Menu.Item>
        <Menu.Item >
          <Menu.Header>
            <Menu.Header>Text Channels</Menu.Header>
            <ChannelList channels={channels}/>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>
            <Menu.Header>Direct Messages</Menu.Header>
            <DirectMessageList/>
          </Menu.Header>
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default LeftMenu;