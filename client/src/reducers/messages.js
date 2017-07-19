const messages = (state = [], action) => {
  switch (action.type) {
  case 'SET_MESSAGES':
    return action.messages;
  case 'ADD_MESSAGE':
    console.log(action.message);
    return [...state, action.message];
  case 'RECEIEVE_MESSAGES':
    return action.messages;
  case 'FETCH_MESSAGES':
    
  default:
    return state;
  }
};

export default messages;

