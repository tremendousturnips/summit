import { SET_CHANNELS, ADD_CHANNEL } from '../actions/actionTypes';

const channelsByRoom = (state = {0: []}, action) => {
  switch (action.type) {
  case SET_CHANNELS:
    return { 
      ...state, 
      [action.roomId]: action.channels.map(channel => {
        return channel.id;
      })
    };
  case ADD_CHANNEL:
    const channels = state[action.channel.room_id] || [];
    return {
      ...state,
      [action.channel.room_id]: channels.concat(action.channel.id)
    };
  default:
    return state;
  }
};

export default channelsByRoom;

