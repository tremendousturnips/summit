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
    return {...state,[action.friend.friend_id]: action.friend };
  case DEL_FROM_FRIEND_LIST:
    const newState = { ...state };
    delete newState[action.key]
    return newState;  
  case UPDATE_TO_FRIEND_LIST:
    //state[action.key].status = action.status
    const newStateUpdate = { ...state };
    newStateUpdate[action.friendId] = newStateUpdate[action.friendId] || {user_id: action.userId,
                                                    friend_id: action.friendId,
                                                    status: action.status}
    newStateUpdate[action.friendId].status = action.status
    return newStateUpdate;  
  default:
    return state;
  }
};

export default friends;
