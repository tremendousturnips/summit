import { SET_CHANNELS, ADD_CHANNEL } from '../actions/actionTypes';

const channels = (state = { }, action) => {
  switch (action.type) {
  case SET_CHANNELS:
    const channelNormal = {...state};
    action.channels.forEach(channel => {
      channelNormal[channel.id] = channel;
      channelNormal[channel.id].timeStamp = Date.now();
    });
    return channelNormal;
  case ADD_CHANNEL:
    return {...state, [action.channel.id]: action.channel};
  default:
    return state;
  }
};

export default channels;

