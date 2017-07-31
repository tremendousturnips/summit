import axios from 'axios';
import { SET_DIRECTS, ADD_DIRECT } from './actionTypes';

export const setDirects = directs => ({
  type: 'SET_DIRECTS',
  directs
});

export const addDirect = direct => ({
  type: 'ADD_DIRECT',
  direct
});

export const addDirectChannel = (userId, friendId) => {
  return (dispatch) => {
      return axios
        .post(`/api/profiles/${userId}/directs/${friendId}`)
        .then(res => {
            if (res.status === '201') {
              dispatch(addDirect(res.data));
            }
        })
  } 
};

export const fetchDirects = (userId) => {
  return (dispatch) => {
    return axios(`/api/profiles/${userId}/directs`)
      .then( (res) => {
        dispatch(setDirects(res.data));
      })
  }
};

// export const getProfile = (userId) => {
//   return (dispatch) => {
//     return axios (`/api/profiles/${userId}`)
//     .then((res) => {
//       dispatch(addProfile(res));
//     })
//   }
// };