import React, { Component } from 'react'
import { List, Image, Modal } from 'semantic-ui-react'

class AddFriend extends Component {
    constructor(props) {
      super (props)
    }

    deleteFriend () {
      console.log('In deleteFriend',this.props.friend.id, this.props, this.props.index)
      this.props.delFriend(this.props.friend.user_id, this.props.friend.friend_id, this.props.index)
    }

    componentWillMount() {
      console.log('in addFriend')
    }

    render () {
      return (
        <Modal
           /* trigger={<Button onClick={this.handleOpen}>Show Modal</Button>*/
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small' 
        >
          <Modal.Header>
            <Input icon="users" iconPosition="left" placeholder="Search users..." />
          </Modal.Header>  
          <Modal.Content>
            {this.props.notFriends.map((friend,index) => {
              <FriendListItemContainer friend={friend}
                                       actionType='Add' 
                                       actionFunc={this.props.addFriend}
                                       index={index} 
                                       key={index}
              />  
            })}
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleClose} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
}

export default AddFriend;