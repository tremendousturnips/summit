import { connect } from 'react-redux';
import DirectMessageItem from '../components/DirectMessageItem';
import { getProfile } from '../actions/profiles';
import { selectChannel } from '../actions/channels';

const mapStateToProps = ({ profiles, directs, channels }) => ({ profiles, directs, channels });

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  },
  selectChannel: (channel) => {
    dispatch(selectChannel(channel));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageItem);