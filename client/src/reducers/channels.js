
const channel = (state = [], action) => {
  switch (action.type) {
  case 'SET_CHANNEL':
    return action.channel;
  case 'ADD_CHANNEL':
    return [...state, action.channel];
  default:
    return state;
  }
};

export default channel;

