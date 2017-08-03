import axios from 'axios';
import { FETCH_FRIENDS, ADD_FRIEND, DEL_FRIEND, SET_FRIENDS, DEL_FROM_FRIEND_LIST, ADD_TO_FRIEND_LIST, UPDATE_TO_FRIEND_LIST } from './actionTypes';
import { addProfile } from './profiles';

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
  console.log('In updateFriend')
  return (dispatch) => {
      return axios
        .put(`/api/profiles/${userId}/friends/${friendId}/status/${status}`)
        .then(res => {
            if (res.status === 201) {
              console.log('In updateFriend', res.data, friendId, status)
              dispatch(updateToFriendList(userId, friendId, status));
            }
        })
  };
};

export const updateToFriendList = (userId, friendId, status) => ({
  type: UPDATE_TO_FRIEND_LIST,
    userId, 
    friendId, 
    status
});

export const searchFriend = (userId, text) => {
  return (dispatch) => {
      return axios
        .get(`/api/profiles/${userId}/friends/search/${text}`)
        .then(res => {
            console.log(res.data)
            if (res.status === 200) {
              for (let key in res.data) {
                dispatch(addProfile(res.data[key]))
              }
            }
        })
  };
};

// export const updateToFriendList = (key, status) => ({
//   type: UPDATE_TO_FRIEND_LIST,
//   key,
//   status
// });
