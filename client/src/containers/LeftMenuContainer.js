import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchChannels, setChannel } from '../actions/channels';

const mapStateToProps = ({ user, channels, socket }) => ({ user, channels, socket });

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (roomId) => {
    dispatch(fetchChannels(roomId))
  },
  setChannel: (channelId) => {
    dispatch(setChannel(channelId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
