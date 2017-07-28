import { SELECT_ROOM } from '../actions/actionTypes';

const currentRoom = (state = {id: 0}, action) => {
  switch (action.type) {
  case SELECT_ROOM:
    return action.room;
  default:
    return state;
  }
};

export default currentRoom;

