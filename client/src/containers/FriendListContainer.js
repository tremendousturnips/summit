import { connect } from 'react-redux';
import FriendList from '../components/FriendList';
import { showFriendListStat } from '../actions/showFriendList';
import { fetchFriends, delFriend, addFriend, updateFriend } from '../actions/friends';
<<<<<<< HEAD
import { addDirect } from '../actions/directs';
import { subscribeChannel } from '../actions/channels';
=======
>>>>>>> friend request with socket.io

const mapStateToProps = ({ socket, showFriendList, user, friends, profiles }) => 
                        ({ socket, showFriendList, user, friends, profiles });

const mapDispatchToProps = (dispatch) => ({
  showFriendListStat: () => {
    dispatch(showFriendListStat());
  }, 
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);