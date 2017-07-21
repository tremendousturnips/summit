import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
let dmList = [
  'DUDE 1',
  'DUDE 2',
  'DUDE 3'
]
const DirectMessageList = (props) => (
  <Menu vertical fluid>
    {dmList.map((channel, index) => (
      <Menu.Item key={index}>{channel}</Menu.Item>)
    )}
  </Menu>
);

export default DirectMessageList;