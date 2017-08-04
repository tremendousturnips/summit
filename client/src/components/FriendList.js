import React from 'react';
import { Icon, Menu, List, Button, Modal, Input, Label } from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer';
import AddFriendItemContainer from '../containers/AddFriendItemContainer';
import AddFriendSearchContainer from '../containers/AddFriendSearchContainer';

class FriendList extends React.Component {
  constructor() {
    super();

    this.state= ({
      open: false
    })

    this.closeModal = this.closeModal.bind(this)
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

  closeModal() {
    this.setState({
      open: true
    })
  }

  render() {
    const { friends, profiles, user } = this.props;
    const friendItems = Object.keys(friends).map(key =>
      <FriendListItemContainer friend={friends[key]} index={key} key={key} />
    );
    const profileItems = Object.keys(profiles)
      .filter(key => !(parseInt(key) === user.id || friends[key]))
      .map((key, index) => <AddFriendItemContainer index={key} key={index} />);

    return (
      <Modal
        className="friend-modal"
        trigger={<Menu.Item name="friends" icon="users" />}
        size="small"
        closeIcon="close"
        dimmer="blurring"
      >
        <Modal.Header name="home">
          <Icon name="group" />
          Friends
        </Modal.Header>
        <Modal.Content>
          <List relaxed="very" verticalAlign="top">
            {friendItems}
          </List>
        </Modal.Content>
        <Modal
          className="add-friend-modal"
          trigger={<Button compact icon="add user" color="green" content="Add Friends" inverted />}
          size="small"
          closeIcon="close"
          dimmer="blurring"
          close={this.state.open}
        >
<<<<<<< HEAD
          <AddFriendSearchContainer closeModal={this.closeModal}/>
=======
          <AddFriendSearchContainer />
>>>>>>> be2c815b203db2237c8bd4d5ed9542950fbd97de
          <Modal.Content scrolling>
            <List animated verticalAlign="middle">
              {profileItems}
            </List>
          </Modal.Content>
        </Modal>
      </Modal>
    );
  }
}

export default FriendList;
