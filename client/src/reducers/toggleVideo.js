<<<<<<< HEAD
import { TOGGLE_VIDEO_STAT } from '../actions/actionTypes';

const toggleVideo = (state = false, action) => {
  switch (action.type) {
  case TOGGLE_VIDEO_STAT:
    console.log('reducer toggle Video', state);
    return !state; 
=======
import { TOGGLE_VIDEO, GET_VIDEO } from '../actions/actionTypes';

const toggleVideo = (state = false, action) => {
  switch (action.type) {
  case TOGGLE_VIDEO:
    console.log('reducer toggle Video', state);
    return !state;
  case GET_VIDEO:
    console.log('reduce get video', state);
    return state;  
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
  default:
    return state;
  }
};

export default toggleVideo;