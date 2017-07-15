import React, { Component } from 'react';
import {Grid, Menu, Segment, Header, Container, Sidebar} from 'semantic-ui-react';

import LeftMenu from './LeftMenu';
import NavBar from '../containers/NavBar';
import MessageInput from '../containers/MessageInput';
import MessageBoard from '../containers/MessageBoard';

const Main = () => (
<<<<<<< HEAD

    <Sidebar.Pushable>
      <LeftMenu/>
      <Sidebar.Pusher>
        <Grid padded>
          <Grid.Column width={12}>
            <Grid.Row>
              <NavBar /> 
            </Grid.Row>
            <Segment.Group>
              <MessageBoard />
              <MessageInput />
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Sidebar.Pusher>
    </Sidebar.Pushable>

=======
  <Grid>
      {/* <Menu fluid vertical tabular floated>
        <Menu.Item name='test'></Menu.Item>
      </Menu> */}
      <SideBar />
    <Grid.Column width={12} id='MessageBoard'>
      <Segment attached='top' inverted id='messageboardtop'>
        <NavBar /> 
      </Segment>  
      <Segment attached='bottom' id='messageboardbottom'>
          <MessageList />
          <MessageInput />
     </Segment>
    </Grid.Column>
  </Grid>
>>>>>>> Work in progress front-end piece
)

export default Main;