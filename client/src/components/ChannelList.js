import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'

const ChannelList = ({ channels, selectChannel, currentChannel }) => (
  <Menu vertical text pointing secondary>
    {channels.map((channel, index) => (
      <Menu.Item active={currentChannel.id == channel.id} key={channel.id} onClick={()=>{selectChannel(channel)}}>{channel.name}</Menu.Item>)
    )}
  </Menu>
);

export default ChannelList;
