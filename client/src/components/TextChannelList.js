import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
let channelList = [
  'CHANNEL 1',
  'CHANNEL 2',
  'CHANNEL 3'
]
const TextChannelList = (props) => (
  <Menu vertical inverted color='grey' fluid>
    {channelList.map((channel, index) => {
      <Menu.Item key={index}>{channel}</Menu.Item>
    })}
  </Menu>
);

export default TextChannelList;