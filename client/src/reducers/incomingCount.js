import { SELECT_CHANNEL, COUNT_MESSAGE } from '../actions/actionTypes';

const incomingCount = (state = {0: 0}, action) => {
  switch (action.type) {
  case COUNT_MESSAGE:
    const messages = state[action.message.channel_id] || [];
    const count = state[action.message.channel_id] ? state[action.message.channel_id] + 1: 1; 
    return {
      ...state,
      [action.message.channel_id]: count
    };
  case SELECT_CHANNEL:
    return {
      ...state,
      [action.channel.id]: 0
    }
  default:
    return state;
  }
};

export default incomingCount;

