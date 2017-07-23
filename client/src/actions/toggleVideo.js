import { TOGGLE_VIDEO, GET_VIDEO } from './actionTypes';

export const toggleVideo = video => ({
  type: TOGGLE_VIDEO,
  video
});

export const getVideo = message => ({
  type: GET_VIDEO,
  videoStat
});