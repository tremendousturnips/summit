import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

class AddFriendItem extends Component {
    constructor(props) {
      super (props)

      this.actionFriend = this.actionFriend.bind(this)

    }

    actionFriend () {
      let userId = this.props.user.id
      let friendId = this.props.index
      this.props.actionFunc(userId, friendId, this.props.index)
    }

    componentWillMount() {
      //console.log('in friendlistitem before mount',this.props.profiles)

    }

    componentDidMount() {
      //console.log('in friendlistitem after mount',this.props.profiles)

    }

    render () {
      return (
        <List.Item>
          <Image avatar src={this.props.profiles[this.props.index].image} alt='p' />
          <List.Content>
             <List.Header>{this.props.profiles[this.props.index].display}</List.Header> 
             <a onClick={this.actionFriend}>{this.props.actionType}</a>
          </List.Content>
        </List.Item>
      );
    }
}

export default AddFriendItem;