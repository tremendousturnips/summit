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
        console.log(res);
        getState().socket.emit('post channel', res.data);
      });
  }
}

export const receiveChannel = channel => {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(addChannel(channel)),
      subscribeChannel(channel.id, getState().socket)
    ]);
  };
};

export const selectChannel = channel => ({
  type: SELECT_CHANNEL,
  channel
})

export const subscribeChannel = (channelId, socket) => {
  socket.emit('subscribe', channelId);
};

export const fetchChannels = roomId => {
  return (dispatch, getState) => {
    const socket = getState().socket;
    return axios.get(`/api/rooms/${roomId}/channels`)
      .then(res => {
        dispatch(setChannels(res.data, roomId));
      })
      .then(() => {
        for(let channelKey in getState().channels) {
          Promise.all([
            dispatch(fetchMessages(roomId, channelKey)),
            subscribeChannel(channelKey, socket)
          ]);
        }
      })
  };
};
