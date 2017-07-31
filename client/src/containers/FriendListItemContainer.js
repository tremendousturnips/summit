import { connect } from 'react-redux';
import FriendListItem from '../components/FriendListItem';
import { getProfile } from '../actions/profiles';
import { selectChannel } from '../actions/channels';
import { addDirectChannel } from '../actions/directs';
 
const mapStateToProps = ({ profiles, channels, directs }) => ({ profiles, channels, directs });

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  },
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  },
  addDirectChannel: (userId, friendId) => {
    dispatch(addDirectChannel(userId, friendId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);