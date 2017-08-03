import React, { Component } from 'react'
import { List, Image, Icon } from 'semantic-ui-react'

class FriendListItem extends Component {
    constructor(props) {
      super (props)

      if (!this.props.profiles[this.props.friend.friend_id]) {
        this.props.getProfile(this.props.friend.friend_id)
      }

      this.removeFriend = this.removeFriend.bind(this)
      this.status = this.status.bind(this)
      this.actions = this.actions.bind(this)
      this.messageFriend = this.messageFriend.bind(this)
      this.acceptFriend = this.acceptFriend.bind(this)
      this.denyFriend = this.denyFriend.bind(this)
      this.loadFriend = this.loadFriend.bind(this)

    }

    status () {
      if (this.props.friend.status === 'Accepted') {
        return <a onClick={this.removeFriend}>Remove</a>
      } else if (this.props.friend.status === 'Pending') {
        return <span><a onClick={this.acceptFriend}><Icon name='checkmark' size='large' color='green' /></a><a onClick={this.denyFriend}><Icon name='remove' size='large' color='red' /></a></span>
      } else if (this.props.friend.status === 'Waiting Approval') {
        return <span>Waiting Approval</span>
      }
    }

    actions() {
      if (this.props.friend.status === 'Accepted') {
        return <a onClick={this.messageFriend}>Message</a>
      } 
    }

    acceptFriend () {
      let userId = this.props.friend.user_id 
      let friendId = this.props.friend.friend_id
      this.props.updateFriend(userId, friendId, 'Accepted')
      let friend = {
        user_id: userId,
        friend_id: friendId,
        status: 'Accepted'
      };
      this.props.socket.emit('friend update', friend )
    }

    denyFriend() {
      let userId = this.props.friend.user_id 
      let friendId = this.props.friend.friend_id
      this.props.updateFriend(userId, friendId, 'Denied') 
      let friend = {
        user_id: userId,
        friend_id: friendId,
        status: 'Denied'
      };
      this.props.socket.emit('friend update', friend ) 
    }

    removeFriend () {
      let userId = this.props.friend.user_id 
      let friendId = this.props.friend.friend_id
      this.props.delFriend(userId, friendId, this.props.index)
      let friend = {
        user_id: userId,
        friend_id: friendId,
        status: 'Removed'
      };
      this.props.socket.emit('friend update', friend, 'Removed')
    }

    messageFriend() {
      console.log('In FriendListItem', this.props.friend.friend_id)
      if (this.props.directs[this.props.friend.friend_id]) {
        //Direct Message exists
        this.props.selectChannel(this.props.channels[this.props.directs[this.props.friend.friend_id].channel_id])
      } else {
        this.props.addDirectChannel(this.props.friend.user_id, this.props.friend.friend_id)
      }
    }

    componentWillMount() {

    }

    loadFriend() {
      if (this.props.profiles[this.props.friend.friend_id]) {
        return <List.Item>
          <List.Content floated='right'>
            {this.status()}
          </List.Content>
          <List.Content floated='left' verticalAlign='top'>
            <Image avatar src={this.props.profiles[this.props.friend.friend_id].image} alt='p' />
          </List.Content>
          <List.Content floated='left' verticalAlign='top'>  
            <List.Header>{this.props.profiles[this.props.friend.friend_id].display} </List.Header>
            <List.Description>
              {this.actions()} 
            </List.Description> 
          </List.Content>    
        </List.Item>
      } else {
        return null
      }
              
    }

    render () {
      return (
        this.loadFriend()
      );
    }
}

export default FriendListItem;