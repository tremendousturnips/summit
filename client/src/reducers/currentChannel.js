
const currentChannel = (state = {}, action) => {
  switch (action.type) {
  case 'SELECT_CHANNEL':
    return action.channel;
  default:
    return state;
  }
};

export default currentChannel;

