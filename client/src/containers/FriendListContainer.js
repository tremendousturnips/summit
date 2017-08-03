import { connect } from 'react-redux';
import FriendList from '../components/FriendList';
import { showFriendListStat } from '../actions/showFriendList';
import { fetchFriends, delFriend, addFriend } from '../actions/friends';

const mapStateToProps = ({ showFriendList, user, friends, profiles }) => ({ showFriendList, user, friends, profiles });

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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);