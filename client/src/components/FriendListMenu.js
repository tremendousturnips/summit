import React from 'react';
import {Icon, Menu, Sidebar, List, Button, Modal, Input, Label} from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer'
import AddFriendItemContainer from '../containers/AddFriendItemContainer'

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
              <List verticalAlign='middle'>
                {this.props.friends.map((friend, index) => <FriendListItemContainer 
                                                            friend={friend}
                                                            actionType='Remove' 
                                                            actionFunc={this.props.delFriend}
                                                            index={index} 
                                                            key={index}/>)}
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
              <Input focus icon="users" iconPosition="left" placeholder="Search users..."  action='Search' />
              <Label corner='right' icon='window close' color='red' onClick={this.toggleShowModal} />
            </Modal.Header>  
            <Modal.Content scrolling>
              <List animated verticalAlign='middle'>
                {Object.keys(this.props.profiles).filter((objectKey) => {
                  return this.props.friends.map((friend) => {
                      return (friend.friend_id === objectKey || friend.user_id === objectKey) 
                  })
                  }).map((objectKey, index) => {
                    return <AddFriendItemContainer actionType='Add' 
                                          actionFunc={this.props.addFriend}
                                          index={objectKey} 
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