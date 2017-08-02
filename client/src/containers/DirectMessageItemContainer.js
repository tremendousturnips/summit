import { connect } from 'react-redux';
import DirectMessageItem from '../components/DirectMessageItem';
import { getProfile } from '../actions/profiles';
import { selectChannel } from '../actions/channels';

const mapStateToProps = ({ messages, profiles, directs, channels }) => ({ messages, profiles, directs, channels });

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  },
  selectChannel: (channel) => {
    dispatch(selectChannel(channel));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageItem);