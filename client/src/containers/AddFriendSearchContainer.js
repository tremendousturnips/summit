import { connect } from 'react-redux';
import AddFriendSearch from '../components/AddFriendSearch';
import { searchFriend } from '../actions/friends';
import { selectChannel } from '../actions/channels';
import { addFriend } from '../actions/friends';

const mapStateToProps = ({ profiles, friends, user, directs, socket }) => 
                        ({ profiles, friends, user, directs, socket });

const mapDispatchToProps = (dispatch) => ({
  searchFriend: (userId, text) => {
    dispatch(searchFriend(userId, text));
  },
  selectChannel: (channel) => {
    dispatch(selectChannel(channel));
  },
  addFriend: (userId, friendId, index) => {
    dispatch(addFriend(userId, friendId, index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendSearch);