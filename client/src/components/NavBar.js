import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

class NavBar extends React.Component {
  constructor(props) {
    super(props)

<<<<<<< HEAD
    this.state = {
      video: 'join video chat'
    }

=======
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
    this.joinVideoChat = this.joinVideoChat.bind(this)
  }

  joinVideoChat() {
    console.log('In NavBar joinVideoChat')
<<<<<<< HEAD
    this.props.toggleVideoStat()
    console.log('this.props.toggleVideo', this.props.toggleVideo)
    this.setState({
      video: this.props.toggleVideo ? 'join video chat' : 'end video chat'
    })
    
=======
    this.props.toggleVideo()
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
  }

  render() {
    return (
      <Menu id='nav-bar' pointing >
        <Menu.Item name='home'/>
        <Menu.Item name='messages' />
        <Menu.Item name='friends' />
        <Menu.Menu position='right'>
<<<<<<< HEAD
          <Menu.Item name={this.state.video} onClick={this.joinVideoChat}/>
=======
          <Menu.Item name='join video chat' onClick={this.joinVideoChat}/>
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
          <Menu.Item>
            <Input icon='users' iconPosition='left' placeholder='Search users...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;
