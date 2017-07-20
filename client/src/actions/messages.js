import axios from 'axios';

let messageCount = 0
export const setMessages = messages => ({
  //unused
  type: 'SET_MESSAGES',
  messages
});

export const addMessage = message => {
  return {
    type: 'ADD_MESSAGE',
    message
  }
};

export const fetchMessages = room => {
  //unused
  return {
    type: 'FETCH_MESSAGES',
    room
  }
}

export const receiveMessages = (room, data) => {
  //unused
  return {
    type: 'RECEIVE_MESSAGES',
    room,
    messages,
    receivedAt: Date.now()
  }
}

export const sendMessage = (message) => ({
  type: 'SEND_MESSAGE',
  message
});

export const postMessage = (message) => {
  return (dispatch, getState) => {
    dispatch(sendMessage);
    axios.post('/api/messages/', message)
      .then(res => {
        getState().socket.emit('send', res.data);
      });
  };
}
