import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
let dmList = [
  'DUDE 1',
  'DUDE 2',
  'DUDE 3'
]
const DirectMessageList = (props) => (
<<<<<<< HEAD
  <Menu vertical fluid>
=======
  <Menu vertical inverted color='black' fluid>
>>>>>>> Never go back
    {dmList.map((channel, index) => (
      <Menu.Item key={index}>{channel}</Menu.Item>)
    )}
  </Menu>
);

export default DirectMessageList;