
const channel = (state = [], action) => {
  switch (action.type) {
  case 'SET_CHANNELS':
    return action.channels;
  case 'ADD_CHANNEL':
    return [...state, action.channel];
  default:
    return state;
  }
};

export default channel;

