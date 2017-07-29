import React, { Component } from 'react'
import { List, Image, Icon } from 'semantic-ui-react'

class FriendListItem extends Component {
    constructor(props) {
      super (props)

      if (!this.props.profiles[this.props.friend.friend_id]) {
        this.props.getProfile(this.props.friend.friend_id)
      }

      this.actionFriend = this.actionFriend.bind(this)
      this.status = this.status.bind(this)

    }

    status () {
      if (this.props.friend.status === 'Accepted') {
        return <a onClick={this.removeFriend}>Remove</a>
      } else if (this.props.friend.status === 'Pending') {
        return <a onClick={this.acceptFriend}>Accept</a>
      } else {
        return <span>Waiting Approval</span>
      }
    }

    actionFriend () {
      let userId = this.props.friend.user_id || this.props.userId
      let friendId = this.props.friend.friend_id || this.props.friend.id
      this.props.actionFunc(userId, friendId, this.props.index)
    }

    componentWillMount() {

    }

    render () {
      return (
        <List.Item>
          <List.Content floated='right'>
            {this.status()}
          </List.Content>
          <List.Content floated='left' verticalAlign='middle'>
            <Image avatar src={this.props.profiles[this.props.friend.friend_id].image} alt='p' />
            {this.props.profiles[this.props.friend.friend_id].display} 
          </List.Content>
        </List.Item>
      );
    }
}

export default FriendListItem;