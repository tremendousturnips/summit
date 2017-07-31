import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

const DirectMessageList = (props) => (
  <Menu vertical fluid>
    {Object.keys(this.props.directs).map((friendId) => {
      <DirectMessageItem friend={this.props.profiles[friendId]} key={friendId} />
    })}
  </Menu>
);

export default DirectMessageList;