import React from 'react';
import { Icon, Menu, List, Button, Modal, Input, Label } from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer';
import AddFriendItemContainer from '../containers/AddFriendItemContainer';

class FriendList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.toggleShowModal = this.toggleShowModal.bind(this);
  }

  componentWillMount() {
    const {
      user,
      socket,
      fetchFriends,
      updateFriend,
      addDirect,
      addChannel,
      subscribeChannel,
      setMessages
    } = this.props;
    fetchFriends(user.id);
    socket.on('friend update', friend => {
      const { friend_id, user_id, status } = friend;
      if (user.id === parseInt(friend_id)) {
        switch (status) {
        case 'Denied':
          updateFriend(friend_id, user_id, 'Blocked');
          break;
        case 'Accepted':
        case 'Pending':
        case 'Removed':
          updateFriend(friend_id, user_id, status);
        default:
          break;
        }
      }
    });
    socket.on('Start direct message', direct => {
      const { to_user_id, user_id, id, channel_id } = direct;
      if (user.id === parseInt(to_user_id)) {
        const d = {
          user_id: parseInt(to_user_id),
          to_user_id: user_id,
          id: id || '',
          channel_id
        };
        addDirect(d);
        const c = {
          id: channel_id,
          name: '',
          room_id: 0
        };
        addChannel(c, 0);
        subscribeChannel(channel_id, socket);
        setMessages([], channel_id);
      }
    });
  }

  toggleShowModal() {
    this.setState({
      showModal: !this.state.showModal
    });
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
        <Modal trigger={<Button compact icon="add user" color="green" content="Add Friends" inverted />}>
          <Modal.Header>
            <Input
              focus
              icon="users"
              iconPosition="left"
              placeholder="Search users..."
              action="Search"
            />
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
        </Modal>
      </Modal>
    );
  }
}

export default FriendList;
