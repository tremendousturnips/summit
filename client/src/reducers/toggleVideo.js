import { TOGGLE_VIDEO_STAT } from '../actions/actionTypes';

const toggleVideo = (state = false, action) => {
  switch (action.type) {
  case TOGGLE_VIDEO_STAT:
    console.log('reducer toggle Video', state);
    return !state; 
  default:
    return state;
  }
};

export default toggleVideo;