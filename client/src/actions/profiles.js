import axios from 'axios';
export const setProfiles = profiles => ({
  type: 'SET_PROFILES',
  profiles
});

export const addProfile = profile => ({
  type: 'ADD_PROFILE',
  profile
});

export const fetchProfiles = (roomId) => {
  return (dispatch, getState) => {
    axios(`/api/rooms/${roomId}/profiles`)
      .then( (res) => {
        dispatch(setProfiles(res.data));
      })
  }
}