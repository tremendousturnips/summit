import React, { Component } from 'react';
import {Grid, Menu, Segment, Header} from 'semantic-ui-react';

import MessageList from '../containers/MessageList'
import SideBar from './SideBar';
import NavBar from '../containers/NavBar';
import MessageInput from './MessageInput'

const Main = () => (
  <Grid>
      {/* <Menu fluid vertical tabular floated>
        <Menu.Item name='test'></Menu.Item>
      </Menu> */}
      <SideBar />
    <Grid.Column width={12} id='MessageBoard'>
      <Segment attached='top' inverted id='messageboardtop'>
        <NavBar /> 
      </Segment>  
      <Segment attached id='messageboardmiddle'>
        <MessageList />
      </Segment>
      <Segment attached='bottom' id='messageboardbottom'>
          <MessageInput />
     </Segment>
    </Grid.Column>
  </Grid>
)

export default Main;