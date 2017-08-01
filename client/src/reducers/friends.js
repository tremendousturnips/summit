import { SET_FRIENDS, ADD_TO_FRIEND_LIST, DEL_FROM_FRIEND_LIST, UPDATE_TO_FRIEND_LIST } from '../actions/actionTypes';

const friends = (state = [], action) => {
  switch (action.type) {
  case SET_FRIENDS:
    const friendsNormal = {};
    action.friends.forEach((friend)=>{
      friendsNormal[friend.friend_id] = friend;
    });
    return friendsNormal;
  case ADD_TO_FRIEND_LIST:
    state[action.friend.friend_id] = action.friend;
    return {...state};
  case DEL_FROM_FRIEND_LIST:
    delete state[action.key]
    return {...state};  
  case UPDATE_TO_FRIEND_LIST:
    console.log(state, action.key)
    state[action.key].status = action.status
    return {...state};  
  default:
    return {...state};
  }
};

export default friends;
