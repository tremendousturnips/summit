
const currentChannel = (state = 1, action) => {
  switch (action.type) {
  case 'SELECT_CHANNEL':
    console.log('selecting channels');
    return action.channel;
  default:
    return state;
  }
};

export default currentChannel;

