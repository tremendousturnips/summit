import { SET_CHANNELS, ADD_CHANNEL } from '../actions/actionTypes';

const channelsByRoom = (state = {}, action) => {
  switch (action.type) {
  case SET_CHANNELS:
    console.log(action.roomId);
    return { ...state, [action.roomId]: action.channels.map(channel => {
      return channel.id;
    }) };
  case ADD_CHANNEL:
    const channelList = state[action.channel.room_id] ? state[action.channel.room_id].push(action.channel.id) : [action.channel.id];
    return {...state, [action.channel.room_id]: channelList};
  default:
    return state;
  }
};

export default channelsByRoom;

