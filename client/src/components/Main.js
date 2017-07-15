import React, { Component } from 'react';
import {Grid, Menu, Segment, Header, Container, Sidebar} from 'semantic-ui-react';

import MessageList from '../containers/MessageList'
import LeftMenu from './LeftMenu';
import NavBar from '../containers/NavBar';
import MessageInput from './MessageInput'

const Main = () => (

    <Sidebar.Pushable>
      <LeftMenu/>
      <Sidebar.Pusher>
        <Grid padded>
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
      </Sidebar.Pusher>
    </Sidebar.Pushable>

)

export default Main;