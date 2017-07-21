import React, { Component } from 'react';
import {Grid, Menu, Segment, Header, Container, Sidebar} from 'semantic-ui-react';

import LeftMenu from './LeftMenu';
import NavBar from '../containers/NavBar';
// import MessageInput from '../containers/MessageInput';
import MessageContainer from '../containers/MessageContainer';
import InputContainer from '../containers/InputContainer';
import LeftMenuContainer from '../containers/LeftMenuContainer';

const Main = () => (

    <Sidebar.Pushable>
      {/* <LeftMenu/> */}
      <LeftMenuContainer/>
      <Sidebar.Pusher>
        <Grid padded>
          <Grid.Column width={12}>
            <Grid.Row>
              <NavBar /> 
            </Grid.Row>
            <Segment.Group>
              <MessageContainer />
              <InputContainer />
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Sidebar.Pusher>
    </Sidebar.Pushable>

)

export default Main;