import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.joinVideoChat = this.joinVideoChat.bind(this)
  }

  joinVideoChat() {
    console.log('In NavBar joinVideoChat')
    this.props.toggleVideo()
  }

  render() {
    return (
      <Menu id='nav-bar' pointing >
        <Menu.Item name='home'/>
        <Menu.Item name='messages' />
        <Menu.Item name='friends' />
        <Menu.Menu position='right'>
          <Menu.Item name='join video chat' onClick={this.joinVideoChat}/>
          <Menu.Item>
            <Input icon='users' iconPosition='left' placeholder='Search users...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;
