import { SHOW_FRIEND_LIST_STAT } from '../actions/actionTypes';

const showFriendList = (state = false, action) => {
  switch (action.type) {
  case SHOW_FRIEND_LIST_STAT:
    return !state; 
  default:
    return state;
  }
};

export default showFriendList;