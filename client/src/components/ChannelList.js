import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'
import AddChannel from './AddChannel';

class ChannelList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {socket, receiveChannel} = this.props;
    socket.on('add channel', receiveChannel);
  }
  render() {
    const {
      currentRoom,
      currentChannel,
      channelsByRoom,
      channels,
      postChannel,
      selectChannel
    } = this.props;

    return (
      <Menu vertical text pointing secondary>
        {currentRoom.id ? <AddChannel postChannel={postChannel}/> : <br />}
        {channelsByRoom[currentRoom.id].map((channelId) => (
          <Menu.Item active={currentChannel.id === channelId} key={channelId} onClick={()=>{selectChannel(channels[channelId])}}>{channels[channelId].name}</Menu.Item>)
        )}
      </Menu>
    );
  }
}

export default ChannelList;
