import { connect } from 'react-redux';
import RoomDropdown from '../components/RoomDropdown';
import { postRoom, fetchRooms, changeRoom, joinRoom } from '../actions/rooms';

const mapStateToProps = ({user, currentRoom, rooms}) => {
  rooms = Object.keys(rooms).map( room => {
    return {key: rooms[room].id, text: rooms[room].name, value: rooms[room].id, content: rooms[room].name};
  });
  return {user, currentRoom, rooms};
}

const mapDispatchToProps = (dispatch) => ({
  postRoom: (room) => {
    dispatch(postRoom(room));
  },
  fetchRooms: () => {
    dispatch(fetchRooms());
  },
  changeRoom: (roomId) => {
    dispatch(changeRoom(roomId));
  },
  joinRoom: (room) => {
    dispatch(joinRoom(room));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomDropdown);