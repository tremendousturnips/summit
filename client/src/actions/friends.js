import axios from 'axios';
import { FETCH_FRIENDS, ADD_FRIEND, DEL_FRIEND, SET_FRIENDS, DEL_FROM_FRIEND_LIST } from './actionTypes';

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
      axios
        .post(`/api/profiles/${userId}/friends/${friendId}`)
        .then(res => {
            dispatch(addToFriendList(res.data));
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
          console.log('key', key);
          dispatch(delFromFriendList(key));
        })
  };
};

export const delFromFriendList = key => ({
  type: DEL_FROM_FRIEND_LIST,
  key
});
