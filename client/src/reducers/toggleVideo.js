import { TOGGLE_VIDEO, GET_VIDEO } from '../actions/actionTypes';

const toggleVideo = (state = false, action) => {
  switch (action.type) {
  case TOGGLE_VIDEO:
    console.log('reducer toggle Video', state);
    return !state;
  case GET_VIDEO:
    console.log('reduce get video', state);
    return state;  
  default:
    return state;
  }
};

export default toggleVideo;