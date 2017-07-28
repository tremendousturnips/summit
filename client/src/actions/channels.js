import axios from 'axios';
import { SET_CHANNELS, ADD_CHANNEL, SELECT_CHANNEL } from './actionTypes';
import { fetchMessages } from './messages';

export const setChannels = channels => ({
  type: SET_CHANNELS,
  channels
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
        dispatch(setChannels(res.data));
      })
      .then(() => {
        const channelList = getState().channels.map((channel) => {
          return dispatch(fetchMessages(roomId, channel.id));
        })
        if (channelList.length) {
          return Promise.all(channelList);
        }
      })
      .then(() => {
        return joinChannels(getState().channels, getState().socket);
      });
  };
};
