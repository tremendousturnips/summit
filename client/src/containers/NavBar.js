import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

const NavBar = (props) => (
  <Menu inverted pointing>
    <Menu.Item name='home'/>
    <Menu.Item name='messages' />
    <Menu.Item name='friends' />
    <Menu.Menu position='right'>
      <Menu.Item>
        <Input icon='users' iconPosition='left' placeholder='Search users...' />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default NavBar;