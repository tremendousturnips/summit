import {SET_ROOMS} from '../actions/actionTypes';

const rooms = (state = {}, action) => {
  switch (action.type) {
  case SET_ROOMS:
    const roomsNormal = {};
    action.rooms.forEach((room)=>{
      roomsNormal[room.id] = room;
    });
    return roomsNormal;
  default:
    return state;
  }
};

export default rooms;