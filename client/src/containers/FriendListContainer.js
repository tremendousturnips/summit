import { connect } from 'react-redux';
import FriendList from '../components/FriendList';
import { fetchFriends, delFriend, addFriend, updateFriend } from '../actions/friends';
import { addDirect } from '../actions/directs';
import { addChannel, subscribeChannel } from '../actions/channels';
import { setMessages } from '../actions/messages';

const mapStateToProps = ({ socket, user, friends, profiles }) =>
                        ({ socket, user, friends, profiles });

const mapDispatchToProps = (dispatch) => ({
  fetchFriends: (userId) => {
    dispatch(fetchFriends(userId));
  },
  delFriend: (userId, friendId, index) => {
    dispatch(delFriend(userId, friendId, index));
  },
  addFriend: (userId, friendId, index) => {
    dispatch(addFriend(userId, friendId, index));
  },
  updateFriend: (userId, friendId, status) => {
    dispatch(updateFriend(userId, friendId, status));
  },
  addDirect: (direct) => {
    dispatch(addDirect(direct));
  },
  subscribeChannel: (channelId, s) => {
    subscribeChannel(channelId, s);
  },
  setMessages: (messages, channelId) => {
    dispatch(setMessages(messages, channelId));
  },
  addChannel: (channel, roomId) => {
    dispatch(addChannel(channel, roomId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
