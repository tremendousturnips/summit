import { connect } from 'react-redux';
import FriendListMenu from '../components/FriendListMenu';
import { showFriendListStat } from '../actions/showFriendList';
import { fetchFriends, delFriend, addFriend } from '../actions/friends';

const mapStateToProps = ({ showFriendList, user, friends }) => ({ showFriendList, user, friends });

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
  addFriend: (userId, friendId) => {
    dispatch(addFriend(userId, friendId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendListMenu);