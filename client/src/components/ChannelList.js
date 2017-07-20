import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'

const ChannelList = ({ channels, selectChannel }) => (
  <Menu vertical inverted color='grey' fluid>
    {console.log(channels, selectChannel)}
    {channels.map((channel, index) => (
      <Menu.Item key={channel.id} onClick={()=>{selectChannel(channel.id)}}>{channel.name}</Menu.Item>)
    )}
  </Menu>
);

export default ChannelList;
