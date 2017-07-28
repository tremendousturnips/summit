import { SET_CHANNELS, ADD_CHANNEL } from '../actions/actionTypes';

const channelsByRoom = (state = {0: []}, action) => {
  switch (action.type) {
  case SET_CHANNELS:
    console.log(action.roomId);
    return { 
      ...state, 
      [action.roomId]: action.channels.map(channel => {
        return channel.id;
      })
    };
  case ADD_CHANNEL:
    return {
      ...state,
      [action.channel.room_id]: state[action.channel.room_id].concat(action.channel.id)
    };
  default:
    return state;
  }
};

export default channelsByRoom;

