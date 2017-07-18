let messageCount = 0
export const setMessages = messages => ({
  type: 'SET_MESSAGES',
  messages
});

export const addMessage = message => {
  console.log('in action')
  message.id = messageCount++;
  return {
    type: 'ADD_MESSAGE',
    message
  }
};