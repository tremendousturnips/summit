import { connect } from 'react-redux';
import FriendListItem from '../components/FriendListItem';
import { getProfile } from '../actions/profiles';

const mapStateToProps = ({ profiles }) => ({ profiles });

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);