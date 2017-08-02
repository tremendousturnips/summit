import { SET_MESSAGES, ADD_MESSAGE } from '../actions/actionTypes';

const messages2 = (state = { }, action) => {
  switch (action.type) {
  case SET_MESSAGES:
    const messageNormal = {...state};
    action.messages.forEach(message => {
      messageNormal[message.id] = message;
    });
    return messageNormal;
  case ADD_MESSAGE:
    return {...state, [action.message.id]: action.message};
  default:
    return state;
  }
};

export default messages2;

