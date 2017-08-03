import axios from 'axios';
import { SET_DIRECTS, ADD_DIRECT } from './actionTypes';
import { setMessages } from './messages';
import { setChannels, subscribeChannel, selectChannel } from './channels';

export const setDirects = directs => ({
  type: 'SET_DIRECTS',
  directs
});

export const addDirect = direct => ({
  type: 'ADD_DIRECT',
  direct
});

export const addDirectChannel = (userId, friendId) => {
  return (dispatch, getState) => {
      return axios
        .post(`/api/profiles/${userId}/directs/${friendId}`)
        .then(res => {
            if (res.status === 201) {
              const socket = getState().socket;
              dispatch(addDirect(res.data));
              var channel = [{
                id: res.data.channel_id,
                name: '',
                room_id: 'direct'
              }]
              dispatch(setChannels(channel, 'direct'))
              subscribeChannel(res.data.channel_id, socket)
              dispatch(selectChannel(channel));
              socket.emit('Start direct message', res.data)
            }
        })
  } 
};

export const fetchDirects = (userId) => {
  return (dispatch, getState) => {
    const socket = getState().socket;
    return axios(`/api/profiles/${userId}/directs`)
      .then((res) => {
        dispatch(setDirects(res.data));
      })
      .then(() => {
        const directs = getState().directs
        for (let key in directs) {
          var channel = [{
            id: directs[key].channel_id,
            name: '',
            room_id: 'direct'
          }]
          dispatch(setChannels(channel, 'direct'))
          subscribeChannel(directs[key].channel_id, socket)
          for (let message in directs.messages) {
            dispatch(setMessages(message));
          }
        }
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