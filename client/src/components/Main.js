import React, { Component } from 'react';
import {Grid, Menu, Segment, Header, Container, Sidebar} from 'semantic-ui-react';

import LeftMenu from './LeftMenu';
import NavBar from '../containers/NavBar';
// import MessageInput from '../containers/MessageInput';
import MessageContainer from '../containers/MessageContainer';
import InputContainer from '../containers/InputContainer';
import LeftMenuContainer from '../containers/LeftMenuContainer';
import RightMenu from './RightMenu';

const Main = () => (
    <Sidebar.Pushable>
      {/* <LeftMenu/> */}
      <Sidebar.Pusher>
        <Grid>
          <Grid.Column width={2}>
              <LeftMenuContainer/>
          </Grid.Column>  
          <Grid.Column>
          </Grid.Column>  
          <Grid.Column width={10} >
            <Grid.Row>
              <NavBar /> 
            </Grid.Row>
            <Grid.Row>
              <MessageContainer />
            </Grid.Row>
            <Grid.Row>
              <InputContainer />
            </Grid.Row>  
          </Grid.Column> 
          <Grid.Column>
            <RightMenu />
          </Grid.Column>  
        </Grid>
      </Sidebar.Pusher> 
    </Sidebar.Pushable>
    
)

export default Main;