import axios from 'axios';
import { SET_CHANNELS, ADD_CHANNEL, SELECT_CHANNEL } from './actionTypes';

export const setChannels = channels => ({
  type: SET_CHANNELS,
  channels
});

export const addChannel = channel => ({
  type: ADD_CHANNEL,
  channel
});

export const selectChannel = channel => ({
  type: SELECT_CHANNEL,
  channel
});

export const changeChannel = channel => {};

export const joinChannels = (channels, socket) => {
  channels.forEach(channel => {
    socket.emit('subscribe', channel.id);
  });
};

export const fetchChannels = roomId => {
  return (dispatch, getState) => {
    axios
      .get(`/api/rooms/${roomId}/channels`)
      .then(res => {
        dispatch(setChannels(res.data));
      })
      .then(() => {
        joinChannels(getState().channels, getState().socket);
      });
  };
};
