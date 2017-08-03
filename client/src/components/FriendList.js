import React from 'react';
import { Icon, Menu, List, Button, Modal, Input, Label } from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer';
import AddFriendItemContainer from '../containers/AddFriendItemContainer';

class FriendList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false
    }

    this.toggleShowModal = this.toggleShowModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchFriends(this.props.user.id)
    this.props.socket.on('friend update', friend => {
      if (this.props.user.id === parseInt(friend.friend_id)) {
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
    this.props.socket.on('Start direct message', (direct) => {
      if (this.props.user.id === parseInt(direct.to_user_id)) {
        let d = {
          user_id: parseInt(direct.to_user_id),
          to_user_id : direct.user_id,
          id: direct.id || '',
          channel_id: direct.channel_id
        }
        this.props.addDirect(d)
        var c = {
          id: direct.channel_id,
          name: '',
          room_id: 0
        }
        this.props.addChannel(c, 0)
        this.props.subscribeChannel(direct.channel_id, this.props.socket);
        this.props.setMessages([], direct.channel_id);
      }
    });
  }

toggleShowModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    const { friends } = this.props;
    const friendItems = Object.keys(friends).map(objectKey =>
      <FriendListItemContainer friend={friends[objectKey]} index={objectKey} key={objectKey} />
    );

    return (
      <Modal trigger={<Menu.Item name="friends" icon="users" />}>
        <Modal.Header name="home">
          <Icon name="group" />
          Friends
        </Modal.Header>
        <Modal.Content>
          <List relaxed="very" verticalAlign="top">
            {friendItems}
          </List>
        </Modal.Content>
        <Menu.Item name="addFriend">
          <Button.Group labeled>
            <Button
              compact
              icon="add user"
              color="green"
              content="Add"
              onClick={this.toggleShowModal}
              inverted
            />
          </Button.Group>
        </Menu.Item>
        <Modal open={this.state.showModal} onClose={this.handleCloseModal} size="small">
          <Modal.Header>
            <Input
              focus
              icon="users"
              iconPosition="left"
              placeholder="Search users..."
              action="Search"
            />
            <Label corner="right" icon="window close" color="red" onClick={this.toggleShowModal} />
          </Modal.Header>
          <Modal.Content scrolling>
            <List animated verticalAlign="middle">
              {Object.keys(this.props.profiles)
                .filter(objectKey => {
                  let r = true;
                  if (parseInt(objectKey) === this.props.user.id) {
                    r = false;
                  } else {
                    for (var key in this.props.friends) {
                      if (objectKey === key) {
                        r = false;
                      }
                    }
                  }
                  return r;
                })
                .map((objectKey, index) => {
                  return <AddFriendItemContainer index={objectKey} key={index} />;
                })}
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.toggleShowModal} inverted>
              <Icon name="checkmark" /> Done
            </Button>
          </Modal.Actions>
        </Modal>
      </Modal>
    );
  }
}

export default FriendList;
