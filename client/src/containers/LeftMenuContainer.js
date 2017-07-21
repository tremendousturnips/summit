import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchChannels, setChannels, selectChannel } from '../actions/channels';

const mapStateToProps = ({ user, channels, socket }) => ({ user, channels, socket });

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (roomId) => {
    dispatch(fetchChannels(roomId));
  },
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  }
  // joinChannels: (channels) => {
  //   //TODO: dispatch action to socket.join on every channel that is fetched
  //   //TODO: fetch messages from current channel on changechannel
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
