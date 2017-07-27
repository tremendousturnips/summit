import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

class FriendListItem extends Component {
    constructor(props) {
      super (props)

      if (this.props.friend.image === '') {
        this.props.friend.image = "https://robohash.org/" + this.props.friend.display + ".png"
      }

      this.deleteFriend = this.deleteFriend.bind(this)

    }

    deleteFriend () {
      console.log('In deleteFriend',this.props.friend.id, this.props, this.props.index)
      this.props.delFriend(this.props.friend.user_id, this.props.friend.friend_id, this.props.index)
    }

    componentWillMount() {
      console.log('in friendlistitem',this.props.friend)
    }

    render () {
      return (
        <List.Item>
          <Image avatar src={this.props.friend.image} alt='p' />
          <List.Content>
             <List.Header>{this.props.friend.first}</List.Header> 
             <a onClick={this.deleteFriend}>Delete</a>
          </List.Content>
        </List.Item>
      );
    }
}

export default FriendListItem;