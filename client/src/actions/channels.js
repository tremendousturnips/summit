import axios from 'axios';

export const setChannels = channels => ({
  type: 'SET_CHANNELS',
  channels
});

export const addChannel = channel => ({
  type: 'ADD_CHANNEL',
  channel
});

export const selectChannel = channel => {
  type: 'SELECT_CHANNEL',
  channel
}

// export const requestChannels = room => {
//   type: 'REQUEST_CHANNELS',
//   room
// }

export const fetchChannels = channels => {
  return (dispatch) => {
    axios.get(`/api/rooms/${roomId}/channels`)
      .then((res) => {
        console.log(res.data);
      });
  };
};
