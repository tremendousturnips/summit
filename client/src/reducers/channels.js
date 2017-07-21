
const channels = (state = [], action) => {
  switch (action.type) {
  case 'SET_CHANNELS':
    console.log('setting channels');
    return action.channels;
  case 'ADD_CHANNEL':
    return [...state, action.channel];
  default:
    return state;
  }
};

export default channels;

