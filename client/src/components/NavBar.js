import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      video: 'join video chat'
    }

    this.joinVideoChat = this.joinVideoChat.bind(this)
  }

  joinVideoChat() {
    console.log('In NavBar joinVideoChat')
    this.props.toggleVideoStat()
    console.log('this.props.toggleVideo', this.props.toggleVideo)
    this.setState({
      video: this.props.toggleVideo ? 'join video chat' : 'end video chat'
    })
    
  }

  render() {
    return (
      <Menu id='nav-bar' pointing >
        <Menu.Item name='home'/>
        <Menu.Item name='messages' />
        <Menu.Item name='friends' />
        <Menu.Menu position='right'>
          <Menu.Item name={this.state.video} onClick={this.joinVideoChat}/>
          <Menu.Item>
            <Input icon='users' iconPosition='left' placeholder='Search users...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;
