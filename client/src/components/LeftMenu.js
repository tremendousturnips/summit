import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import ChannelList from './ChannelList';
import DirectMessageList from './DirectMessageList';

class LeftMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: true,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchChannels(1);
  }

  handleClick(e) {
    console.log('click on profile');
    // do things to the state of the app inherited as props
  }

  render() {
    const { visible } = this.state;
    const { channels, selectChannel, user } = this.props;
    return (
      <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical fixed="left">
        <Menu.Item name='mail' onClick={this.handleClick.bind(this)}>
          <Image src={user.image} size='tiny' shape='circular' centered />
          <p />
          <Menu.Header>{user.first}</Menu.Header>
        </Menu.Item>
        <Menu.Item >
          <Menu.Header>
            <Menu.Header>Text Channels</Menu.Header>
            <br />
            <ChannelList channels={channels} selectChannel={selectChannel}/>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>
            <Menu.Header>Direct Messages</Menu.Header>
            <br />
            <DirectMessageList/>
          </Menu.Header>
        </Menu.Item>
      </Sidebar>
    )
  }
}

export default LeftMenu;