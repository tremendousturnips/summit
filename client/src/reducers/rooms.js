import {SET_ROOMS, ADD_ROOM} from '../actions/actionTypes';

const rooms = (state = {}, action) => {
  switch (action.type) {
  case SET_ROOMS:
    const roomsNormal = {};
    action.rooms.forEach((room)=>{
      roomsNormal[room.id] = room;
    });
    return roomsNormal;
  case ADD_ROOM:
    return {...state, [action.room.id]: action.room}
  default:
    return state;
  }
};

export default rooms;