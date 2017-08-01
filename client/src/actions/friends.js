import axios from 'axios';
import { FETCH_FRIENDS, ADD_FRIEND, DEL_FRIEND, SET_FRIENDS, DEL_FROM_FRIEND_LIST, ADD_TO_FRIEND_LIST, UPDATE_TO_FRIEND_LIST } from './actionTypes';

export const fetchFriends = userId => {
  return (dispatch) => {
    return axios
      .get(`/api/profiles/${userId}/friends`)
      .then(res => {
        dispatch(setFriends(res.data));
      })
  };
};

export const setFriends = friends => ({
  type: SET_FRIENDS,
  friends
});

export const addFriend = (userId, friendId) => {
  return (dispatch) => {
      return axios
        .post(`/api/profiles/${userId}/friends/${friendId}`)
        .then(res => {
            console.log('res.data', res.data, res.status)
            if (res.status === 201) {
              console.log('res.data', res.data)
              dispatch(addToFriendList(res.data));
            }
        })
  };
};

export const addToFriendList = friend => ({
  type: ADD_TO_FRIEND_LIST,
  friend
});

export const delFriend = (userId, friendId, key) => {
  return (dispatch) => {
      return axios
        .delete(`/api/profiles/${userId}/friends/${friendId}`)
        .then(res => {
          console.log('In friends action', friendId)
          dispatch(delFromFriendList(friendId));
        })
  };
};

export const delFromFriendList = key => ({
  type: DEL_FROM_FRIEND_LIST,
  key
});

export const updateFriend = (userId, friendId, status) => {
  return (dispatch) => {
      return axios
        .put(`/api/profiles/${userId}/friends/${friendId}/status/${status}`)
        .then(res => {
            if (res.status === 201) {
              dispatch(updateToFriendList(friendId, status));
            }
        })
  };
};

export const updateToFriendList = (key, status) => ({
  type: UPDATE_TO_FRIEND_LIST,
  key,
  status
});
