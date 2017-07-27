import { connect } from 'react-redux';
import RoomDropdown from '../components/RoomDropdown';
import { postRoom, fetchRooms } from '../actions/rooms';

const mapStateToProps = ({user, currentRoom, rooms}) => ({user, currentRoom, rooms})

const mapDispatchToProps = (dispatch) => ({
  postRoom: (room) => {
    dispatch(postRoom(room));
  },
  fetchRooms: () => {
    dispatch(fetchRooms());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomDropdown);