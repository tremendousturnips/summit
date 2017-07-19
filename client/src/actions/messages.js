let messageCount = 0
export const setMessages = messages => ({
  type: 'SET_MESSAGES',
  messages
});

export const addMessage = message => {
  message.id = messageCount++;
  return {
    type: 'ADD_MESSAGE',
    message
  }
};

export const fetchMessages = room => {
  return {
    type: 'FETCH_MESSAGES',
    room
  }
}

export const receiveMessages = (room, data) => {
  return {
    type: 'RECEIVE_MESSAGES',
    room,
    messages,
    receivedAt: Date.now()
  }
}

export const sendMessage = () => {
  return {
    type: 'SEND_MESSAGE',
    
  }
}