import { SHOW_FRIEND_LIST_STAT } from '../actions/actionTypes';

const showFriendList = (state = false, action) => {
  switch (action.type) {
  case SHOW_FRIEND_LIST_STAT:
    console.log('In show friend list stat reducer', state)
    return !state; 
  default:
    return state;
  }
};

export default showFriendList;