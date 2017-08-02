import { connect } from 'react-redux';
import DirectMessageItem from '../components/DirectMessageItem';
import { getProfile } from '../actions/profiles';
import { selectChannel } from '../actions/channels';

<<<<<<< HEAD
const mapStateToProps = ({ messages, profiles, directs, channels }) => 
                        ({ messages, profiles, directs, channels });
=======
const mapStateToProps = ({ messages, profiles, directs, channels }) => ({ messages, profiles, directs, channels });
>>>>>>> search friends

const mapDispatchToProps = (dispatch) => ({
  getProfile: (userId) => {
    dispatch(getProfile(userId));
  },
  selectChannel: (channel) => {
    dispatch(selectChannel(channel));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageItem);