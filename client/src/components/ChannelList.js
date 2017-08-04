import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'
import AddChannel from './AddChannel';

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      channelName: '',
      error: ''
    }
    this.close = this.close.bind(this);
  }

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
    const {socket, receiveChannel} = this.props;
    socket.on('add channel', receiveChannel);
  }

  render() {
    const { open } = this.state;

    const {
      currentRoom,
      currentChannel,
      channelsByRoom,
      channels,
      incomingCount,
      postChannel,
      selectChannel
    } = this.props;

    return (
      <div>
        <Menu.Header>Channels
          {currentRoom.id ? <Icon style={{float: 'right'}} name='add circle' link onClick={this.show}/>
          : <div></div>}
        </Menu.Header>
        <Menu vertical text secondary>
          {currentRoom.id ? channelsByRoom[currentRoom.id].map((channelId) => (
            <Menu.Item active={currentChannel.id === channelId} key={channelId} onClick={()=>{selectChannel(channels[channelId])}}>{channels[channelId].name}
                {incomingCount[channelId] ? 
                  <Label size='tiny' content={incomingCount[channelId]} color='green' style={{float: 'right', position: 'absolute'}}/> : 
                  <div />}
            </Menu.Item>)
          ) : <div />}
          <AddChannel postChannel={postChannel} open={open} close={this.close}/>
        </Menu>
      </div>
    );
  }
}

export default ChannelList;
