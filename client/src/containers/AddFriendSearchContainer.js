import { connect } from 'react-redux';
import AddFriendSearch from '../components/AddFriendSearch';
import { searchFriend } from '../actions/friends';

const mapStateToProps = ({ profiles, friends, user }) => ({ profiles, friends, user });

const mapDispatchToProps = (dispatch) => ({
  searchFriend: (userId, text) => {
    dispatch(searchFriend(userId, text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendSearch);