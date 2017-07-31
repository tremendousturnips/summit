import { connect } from 'react-redux';
import FriendListItem from '../components/DirectMessageItem';
import { getProfile } from '../actions/profiles';

const mapStateToProps = ({ profiles, directs }) => ({ profiles, directs });

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageItem);