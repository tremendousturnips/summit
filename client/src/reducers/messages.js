const messages = (state = [], action) => {
  switch (action.type) {
  case 'SET_MESSAGES':
    return action.messages;
  case 'ADD_MESSAGE':
    action.message.created_at = Date();
    return [...state, action.message];
  case 'RECEIEVE_MESSAGES':
    return action.messages;
  case 'SEND_MESSAGE':
  default:
    return state;
  }
};

export default messages;

