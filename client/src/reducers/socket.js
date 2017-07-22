import { SET_SOCKET } from '../actions/actionTypes';

const socket = (state = [], action) => {
  switch (action.type) {
  case SET_SOCKET:
    return action.socket;
  default:
    return state;
  }
};

export default socket;

