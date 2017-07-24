<<<<<<< HEAD
import { TOGGLE_VIDEO_STAT } from './actionTypes';

export const toggleVideoStat = video => ({
  type: TOGGLE_VIDEO_STAT,
  video
=======
import { TOGGLE_VIDEO, GET_VIDEO } from './actionTypes';

export const toggleVideo = video => ({
  type: TOGGLE_VIDEO,
  video
});

export const getVideo = message => ({
  type: GET_VIDEO,
  videoStat
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
});