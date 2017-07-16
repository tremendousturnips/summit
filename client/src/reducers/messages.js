const initialState = [
    { username: 'joe', text: 'whatever', timestamp: Date(), id: 0
    },
    { username: 'joe', text: 'whatever1', timestamp: Date(), id: 1
    },
    { username: 'joe', text: 'whatever2', timestamp: Date(), id: 2
    }
  ];

const messages = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_MESSAGES':
    console.log('reducer message', action.messages);
    return action.messages;
  case 'ADD_MESSAGE':
    console.log('add message: ', action.message);
    return [...state, action.message];
  default:
    return state;
  }
};

export default messages;

