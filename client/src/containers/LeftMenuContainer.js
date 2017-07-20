import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchChannels, setChannels, selectChannel } from '../actions/channels';

const mapStateToProps = ({ user, channels, socket }) => ({ user, channels, socket });

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (roomId) => {
    dispatch(fetchChannels(roomId));
  },
  setChannels: (channelId) => {
    dispatch(setChannels(channelId));
  },
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
