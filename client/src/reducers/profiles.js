const profiles = (state = [], action) => {
  switch (action.type) {
  case 'SET_PROFILES':
    return action.profiles;
  case 'ADD_CHANNEL':
    return [...state, action.profile];
  default:
    return state;
  }
};

export default profiles;

