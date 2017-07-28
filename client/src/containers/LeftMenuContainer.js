import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchChannels, setChannels, selectChannel, addChannel, postChannel, postRoom } from '../actions/channels';
import { fetchProfiles } from '../actions/profiles';
import {fetchRooms } from '../actions/rooms';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  fetchProfiles: (roomId) => {
    dispatch(fetchProfiles(roomId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
