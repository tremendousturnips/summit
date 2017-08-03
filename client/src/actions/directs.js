import axios from 'axios';
import { SET_DIRECTS, ADD_DIRECT } from './actionTypes';
import { setMessages } from './messages';
import { setChannels, subscribeChannel, selectChannel, addChannel } from './channels';
import { addRoom } from './rooms';

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
      return Promise.all([
        axios
        .post(`/api/profiles/${userId}/directs/${friendId}`)
        .then(res => {
            if (res.status === 201) {
              const socket = getState().socket;
              dispatch(addDirect(res.data));
              var channel = {
                id: res.data.channel_id,
                name: '',
                room_id: 0
              }
              dispatch(addChannel(channel, 0))
              subscribeChannel(res.data.channel_id, socket)
              dispatch(setMessages([], res.data.channel_id));
              dispatch(selectChannel(channel));
              socket.emit('Start direct message', res.data)
            }
        })
      ]);    
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
        dispatch(addRoom({id: 0,
                          name: 'direct', 
                          description: 'Direct conversation room'}))
        for (let key in directs) {
          var channel = {
            id: directs[key].channel_id,
            name: '',
            room_id: 0
          }
          dispatch(addChannel(channel, 0))
          subscribeChannel(directs[key].channel_id, socket)
          directs[key].message = directs[key].message || []
          dispatch(setMessages(directs[key].message, directs[key].channel_id));
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