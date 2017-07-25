import axios from 'axios';
import { SET_CHANNELS, ADD_CHANNEL, SELECT_CHANNEL } from './actionTypes';
import { fetchMessages } from './messages';

export const setChannels = channels => ({
  type: SET_CHANNELS,
  channels
});

export const addChannel = channel => ({
  //unused
  type: ADD_CHANNEL,
  channel
});

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
        dispatch(setChannels(res.data));
      })
      .then(() => {
        const channelList = getState().channels.map((channel) => {
          return dispatch(fetchMessages(1, channel.id)); //TODO: change this to get by current room
        })
        console.log(channelList);
        if (channelList.length) {
          console.log('is this a promise', channelList[0]);
          return Promise.all(channelList);
        }
      })
      .then(() => {
        return joinChannels(getState().channels, getState().socket);
      });
  };
};
