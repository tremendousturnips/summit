import { SET_MESSAGES, ADD_MESSAGE } from '../actions/actionTypes';

const messagesByChannel = (state = {0: []}, action) => {
  switch (action.type) {
  case SET_MESSAGES:
    return {
      ...state, 
      [action.channelId]: action.messages.map(message => {
        return message.id;
      })
    };
  case ADD_MESSAGE:
    const messages = state[action.message.channel_id] || [];
    return {
      ...state,
      [action.message.channel_id]: messages.concat(action.message.id)
    };
  default:
    return state;
  }
};

export default messagesByChannel;

