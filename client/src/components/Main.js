import React from 'react';
import { Sidebar } from 'semantic-ui-react';

import LeftMenuContainer from '../containers/LeftMenuContainer';
import NavBarContainer from '../containers/NavBarContainer';
import VideoChatBarContainer from '../containers/VideoChatBarContainer';
import MessageContainer from '../containers/MessageContainer';
import InputContainer from '../containers/InputContainer';
import FriendListContainer from '../containers/FriendListContainer';

export default () =>
  <div>
    <Sidebar.Pushable className="app-container">
      <LeftMenuContainer />
      <Sidebar.Pusher>
        <NavBarContainer />
        <VideoChatBarContainer />
        <MessageContainer />
        <InputContainer />
        <FriendListContainer />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>;
