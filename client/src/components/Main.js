import React, { Component } from 'react';
import {Grid, Menu, Segment, Header} from 'semantic-ui-react';

import MessageList from '../containers/MessageList'
import SideBar from './SideBar';
import NavBar from '../containers/NavBar';
import MessageInput from './MessageInput'

const Main = () => (
  <Grid padded>
    <Grid.Column width={4}>
      {/* <Menu fluid vertical tabular floated>
        <Menu.Item name='test'></Menu.Item>
      </Menu> */}
      <SideBar/>
    </Grid.Column>
    <Grid.Column width={12}>
      <Grid.Row>
        <NavBar /> 
      </Grid.Row>
      <Segment.Group>
        <MessageList />
        <MessageInput />
      </Segment.Group>
    </Grid.Column>
  </Grid>
)

export default Main;