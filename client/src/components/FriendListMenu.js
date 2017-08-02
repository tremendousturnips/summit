import React from 'react';
import {Icon, Menu, Sidebar, List, Button, Modal, Input, Label} from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer'
import AddFriendItemContainer from '../containers/AddFriendItemContainer'
import AddFriendSearchContainer from '../containers/AddFriendSearchContainer'

class FriendListMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          showModal: false
        }

        this.handleDone = this.handleDone.bind(this)
        this.handleAddFriend = this.handleAddFriend.bind(this)
        this.toggleShowModal = this.toggleShowModal.bind(this)
    }
    
    componentWillMount() {
      this.props.fetchFriends(this.props.user.id)
      this.props.socket.on('friend update', friend => {
        console.log(friend)
        if (this.props.user.id === parseInt(friend.friend_id)) {
          console.log('Reached')
          switch(friend.status) {
            case 'Accepted':
              this.props.updateFriend(friend.friend_id, friend.user_id, friend.status)
              break;
            case 'Denied':
              this.props.updateFriend(friend.friend_id, friend.user_id, 'Blocked')
              break;
            case 'Pending':
              this.props.updateFriend(friend.friend_id, friend.user_id, friend.status)
              break;
            case 'Removed':
              this.props.updateFriend(friend.friend_id, friend.user_id, friend.status)
              break;  
            default:
              break;  
          }
        };
      });
    }

    toggleShowModal() {
      this.setState({
        showModal: !this.state.showModal
      })
    }

    handleDone() {
      this.props.showFriendListStat();
    }

    handleAddFriend() {
      this.toggleShowModal()
    }

    componentDidMount() {
    }

    render() {
        return (  
        <Sidebar
          as={Menu}
          animation='overlay'
          width='wide'
          direction='right'
          visible={this.props.showFriendList}
          icon='labeled'
          vertical
        >
          <Menu.Item name='home'>
            <Icon name='group' />
            Friends
          </Menu.Item>
          <Menu.Item>
              <List relaxed='very' verticalAlign='top'>
                {Object.keys(this.props.friends).map((objectKey) => { 
                                                          return <FriendListItemContainer 
                                                            friend={this.props.friends[objectKey]}
                                                            index={objectKey} 
                                                            key={objectKey}/>})}
              </List>                                              
          </Menu.Item> 
          <Menu.Item name='addFriend'>
            <Button.Group labeled >
              <Button compact icon='add user' color='red' content='Add' onClick={this.handleAddFriend} inverted/>
              <Button compact icon='checkmark' color='green' content='Done' onClick={this.handleDone} inverted />
            </Button.Group>
          </Menu.Item> 
          <Modal
            open={this.state.showModal}
            onClose={this.handleCloseModal}
            size='small' 
          >
            <Modal.Header>
              <AddFriendSearchContainer />
              <Label corner='right' icon='window close' color='red' onClick={this.toggleShowModal} />
            </Modal.Header>       
            <Modal.Content scrolling>
              <List animated verticalAlign='middle'>
                {Object.keys(this.props.profiles)
                  .filter((objectKey) => {
                    let r = true
                    if (parseInt(objectKey)  === this.props.user.id) {
                      r = false 
                    } else {
                      for (var key in this.props.friends) {
                        if (objectKey === key) {
                          r = false
                        }
                      }
                    }
                    return r
                  })  
                  .map((objectKey, index) => {
                    return <AddFriendItemContainer index={objectKey} 
                                          key={index}
                            />
                  })}
              </List> 
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.toggleShowModal} inverted>
                <Icon name='checkmark' /> Done
              </Button>
            </Modal.Actions>
          </Modal> 
        </Sidebar> 
        )
    }
}

export default FriendListMenu;