import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

class FriendListItem extends Component {
    constructor(props) {
      super (props)

      if (!this.props.profiles[this.props.friend.friend_id]) {
        
      }

      this.actionFriend = this.actionFriend.bind(this)

    }

    actionFriend () {
      let userId = this.props.friend.user_id || this.props.userId
      let friendId = this.props.friend.friend_id || this.props.friend.id
      this.props.actionFunc(userId, friendId, this.props.index)
    }

    componentWillMount() {
      console.log('in friendlistitem',this.props.friend)

    }

    render () {
      return (
        <List.Item>
          <Image avatar src={this.props.profiles[this.props.friend.friend_id].image} alt='p' />
          <List.Content>
             <List.Header>{this.props.profiles[this.props.friend.friend_id].display}</List.Header> 
             <a onClick={this.actionFriend}>{this.props.actionType}</a>
          </List.Content>
        </List.Item>
      );
    }
}

export default FriendListItem;