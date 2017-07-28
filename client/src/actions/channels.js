import axios from 'axios';
import { SET_CHANNELS, ADD_CHANNEL, SELECT_CHANNEL } from './actionTypes';
import { fetchMessages } from './messages';

export const setChannels = (channels, roomId) => ({
  type: SET_CHANNELS,
  channels,
  roomId
});

export const addChannel = channel => ({
  type: ADD_CHANNEL,
  channel
});

export const postChannel = channel => {
  return (dispatch, getState) => {
    channel.room_id = getState().currentRoom.id;
    return axios.post(`/api/rooms/${channel.room_id}/channels`, channel)
      .then((res)=> {
        dispatch(addChannel(res.data));
      });
  }
}

export const selectChannel = channel => ({
  type: SELECT_CHANNEL,
  channel
});

// export const changeChannel = channel => {};

export const joinChannels = (channels, socket) => {
  channels.forEach(channel => {
    socket.emit('subscribe', channel.id);
  });
};

export const fetchChannels = roomId => {
  return (dispatch, getState) => {

    return axios.get(`/api/rooms/${roomId}/channels`)
      .then(res => {
        dispatch(setChannels(res.data, roomId));
      })
      .then(() => {
        for(let channelKey in getState().channels) {
          dispatch(fetchMessages(roomId, channelKey));
        }
      })
      .then(() => {
        // return joinChannels(getState().channels, getState().socket);
      });
  };
};
