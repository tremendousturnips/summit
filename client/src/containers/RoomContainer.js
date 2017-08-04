import { connect } from 'react-redux';
import RoomDropdown from '../components/RoomDropdown';
import { postRoom, fetchRooms, changeRoom, joinRoom } from '../actions/rooms';

const mapStateToProps = ({user, currentRoom, rooms}) => {
  const realRooms = [];
  Object.keys(rooms).forEach( roomId => {
    if( roomId ) {
      realRooms.push({key: roomId, text: rooms[roomId].name, value: roomId, content: rooms[roomId].name});
    }
  });
  return {user, currentRoom, rooms: realRooms};
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