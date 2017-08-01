import { SET_DIRECTS, ADD_DIRECT } from '../actions/actionTypes';

const directs = (state = {}, action) => {
  switch (action.type) {
  case SET_DIRECTS:
    const directsNormal = {};
    action.directs.forEach((direct)=>{
      directsNormal[direct.to_user_id] = direct;
    });
    return directsNormal; 
  case ADD_DIRECT:
    state[action.direct.to_user_id] = action.direct
    return state   
  default:
    return state;
  }
};

export default directs;
