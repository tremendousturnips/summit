import React, { Component } from 'react';
import {Grid, Sidebar} from 'semantic-ui-react';

import LeftMenu from './LeftMenu';
import NavBar from '../containers/NavBarContainer';
import MessageContainer from '../containers/MessageContainer';
import InputContainer from '../containers/InputContainer';
import LeftMenuContainer from '../containers/LeftMenuContainer';
import VideoChatBarContainer from '../containers/VideoChatBarContainer';

const Main = () => (
    <Sidebar.Pushable>
      <Sidebar.Pusher>
        <Grid>
          <Grid.Column width={3}>
              <LeftMenuContainer/>
          </Grid.Column>
          <Grid.Column width={12} >
            <Grid.Row>
              <NavBar />
              <VideoChatBarContainer />
            </Grid.Row>
            <Grid.Row>
              <MessageContainer />
            </Grid.Row>
            <Grid.Row>
              <InputContainer />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
);

export default Main;
