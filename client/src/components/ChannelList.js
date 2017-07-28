import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'
import AddChannel from './AddChannel';

const ChannelList = ({ channels, selectChannel, currentChannel, postChannel }) => (
  <div>
    <AddChannel postChannel={postChannel}/>
    <Menu vertical text pointing secondary>
      {channels.map((channel, index) => (
        <Menu.Item active={currentChannel.id == channel.id} key={channel.id} onClick={()=>{selectChannel(channel)}}>{channel.name}</Menu.Item>)
      )}
    </Menu>
  </div>
);

export default ChannelList;
