import axios from 'axios';
import { SELECT_ROOM, ADD_ROOM, SET_ROOMS } from './actionTypes';
import { fetchChannels } from './channels';


export const selectRoom = room => ({
  type: SELECT_ROOM,
  room
});

export const changeRoom = roomId => {
  return (dispatch) => {
    dispatch(selectRoom({id: roomId}));
  }
}

export const addRoom = room => ({
  type: ADD_ROOM,
  room
});

export const postRoom = room => {
  return (dispatch) => {
    return axios.post(`/api/rooms/`, room)
      .then((res) => {
        dispatch(addRoom(res.data));
      })
  }
}

export const setRooms = rooms => ({
  type: SET_ROOMS,
  rooms
});

export const fetchRooms = () => {
  return (dispatch, getStore) => {
    return axios.get(`/api/profiles/${getStore().user.id}/rooms`)
      .then((res)=>{
        dispatch(setRooms(res.data));
      })
      .then(()=>{
        for (let roomKey in getStore().rooms) {
          dispatch(fetchChannels(roomKey));
        }
      })
      .catch( err => {
        console.log(err);
      });
  }
}
