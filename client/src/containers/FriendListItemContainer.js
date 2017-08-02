import { connect } from 'react-redux';
import FriendListItem from '../components/FriendListItem';
import { getProfile } from '../actions/profiles';
import { selectChannel } from '../actions/channels';
import { addDirectChannel } from '../actions/directs';
import { updateFriend, delFriend } from '../actions/friends';
 
const mapStateToProps = ({ socket, friends, profiles, channels, directs }) => ({ socket, friends, profiles, channels, directs });

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  },
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  },
  addDirectChannel: (userId, friendId) => {
    dispatch(addDirectChannel(userId, friendId));
  },
  updateFriend: (userId, friendId, status) => {
    dispatch(updateFriend(userId, friendId, status));
  },
  delFriend: (userId, friendId) => {
    dispatch(delFriend(userId, friendId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);