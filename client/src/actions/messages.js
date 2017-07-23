import axios from 'axios';
import { SET_MESSAGES, ADD_MESSAGE, RECEIVE_MESSAGES, SEND_MESSAGE } from './actionTypes';

export const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

export const receiveMessages = (room, data) => {
  //unused
  return {
    type: RECEIVE_MESSAGES,
    room,
    messages,
    receivedAt: Date.now()
  };
};

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
});

export const postMessage = message => {
  return (dispatch, getState) => {
    dispatch(addMessage(message));
    axios.post('/api/messages/', message).then(res => {
      getState().socket.emit('send', res.data);
    });
  };
};

export const fetchMessages = (roomId, channelId) => {
  return (dispatch, getState) => {
    axios.get(`/api/rooms/${roomId}/channels/${channelId}/messages`).then(res => {
      dispatch(setMessages(res.data));
    });
  };
};
