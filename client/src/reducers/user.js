const user = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    console.log('reducer user', action.user);
    return action.user;
  default:
    return state;
  }
};

export default user;