import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'

const ChannelList = ({ channels }) => (
  <Menu vertical inverted color='grey' fluid>
    {console.log(channels)}
    {channels.map((channel, index) => (
      <Menu.Item key={index}>{channel.name}</Menu.Item>)
    )}
  </Menu>
);

export default ChannelList;
