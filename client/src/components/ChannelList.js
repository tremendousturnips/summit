import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'
let channelList = [
  'CHANNEL 1',
  'CHANNEL 2',
  'CHANNEL 3'
]
const ChannelList = () => (
  <Menu vertical inverted color='grey' fluid>
    {channelList.map((channel, index) => (
      <Menu.Item key={index}>{channel}</Menu.Item>)
    )}
  </Menu>
);

export default ChannelList;
