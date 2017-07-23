import { SET_MESSAGES, ADD_MESSAGE, RECEIVE_MESSAGES, SEND_MESSAGE } from '../actions/actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
  case SET_MESSAGES:
    return [...state, ...action.messages];
  case ADD_MESSAGE:
    action.message.created_at = Date();
    return [...state, action.message];
  case RECEIVE_MESSAGES:
    //unused
    return action.messages;
  case SEND_MESSAGE:
  default:
    return state;
  }
};

export default messages;

