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