import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchChannels, setChannels, selectChannel, addChannel, postChannel, postRoom } from '../actions/channels';
import { fetchProfiles } from '../actions/profiles';
import {fetchRooms } from '../actions/rooms';

const mapStateToProps = ({ user, channels, socket, currentChannel }) => ({ user, channels, socket, currentChannel });

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (roomId) => {
    dispatch(fetchChannels(roomId));
  },
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  },
  fetchProfiles: (roomId) => {
    dispatch(fetchProfiles(roomId));
  },
  postChannel: (channel) => {
    dispatch(postChannel(channel));
  },
  postRoom: (roomId) => {
    dispatch(postRoom(room));
  },
  fetchRooms: () => {
    dispatch(fetchRooms());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
