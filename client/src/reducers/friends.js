import { SET_FRIENDS, ADD_TO_FRIEND_LIST, DEL_FROM_FRIEND_LIST } from '../actions/actionTypes';

const friends = (state = [], action) => {
  switch (action.type) {
  case SET_FRIENDS:
    return action.friends;
  case ADD_TO_FRIEND_LIST:
    return [...state, action.friend];
  case DEL_FROM_FRIEND_LIST:
    state.splice(action.key, 1);
    return [...state];  
  default:
    return state;
  }
};

export default friends;
