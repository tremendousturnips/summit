import React, { Component } from 'react';
import {Grid, Menu, Segment, Header, Container, Sidebar} from 'semantic-ui-react';

import LeftMenu from './LeftMenu';
import NavBar from '../containers/NavBar';
// import MessageInput from '../containers/MessageInput';
import MessageContainer from '../containers/MessageContainer';
import InputContainer from '../containers/InputContainer';
<<<<<<< HEAD
import LeftMenuContainer from '../containers/LeftMenuContainer';
=======
import RightMenu from './RightMenu';
>>>>>>> video working

const Main = () => (
    <Sidebar.Pushable>
<<<<<<< HEAD
      {/* <LeftMenu/> */}
      <LeftMenuContainer/>
=======
      <LeftMenu/> 
>>>>>>> video working
      <Sidebar.Pusher>
        <Grid color='black'>
          <Grid.Column width={12} >
            <Grid.Row>
              <NavBar /> 
            </Grid.Row>
            <Segment.Group raised>
              <Segment vertical attached='top'>
                <MessageContainer />
              </Segment>
              <Segment attached='bottom'>  
                <InputContainer />
              </Segment>  
            </Segment.Group>
          </Grid.Column> 
        </Grid>
      </Sidebar.Pusher> 
      <RightMenu />
    </Sidebar.Pushable>
)

export default Main;