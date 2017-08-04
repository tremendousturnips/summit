import axios from 'axios';
import { SET_MESSAGES, ADD_MESSAGE, COUNT_MESSAGE, SEND_MESSAGE } from './actionTypes';

export const setMessages = (messages, channelId) => ({
  type: SET_MESSAGES,
  messages,
  channelId
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

export const countMessage = message => ({
  type: COUNT_MESSAGE,
  message
})

export const receiveMessage = (message) => {
  return (dispatch, getState) => {
    dispatch(addMessage(message));
    if( message.channel_id !== getState().currentChannel.id ) {
      dispatch(countMessage(message));
    }
  }
};

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
});

export const postMessage = message => {
  return (dispatch, getState) => {
    return axios.post('/api/messages/', message).then(res => {
      getState().socket.emit('send', res.data);
    });
  };
};

export const fetchMessages = (roomId, channelId) => {
  return (dispatch, getState) =>
    axios.get(`/api/rooms/${roomId}/channels/${channelId}/messages`).then(res => {
      dispatch(setMessages(res.data, channelId));
    });
};
