import axios from 'axios';

export const setChannels = channels => ({
  type: 'SET_CHANNELS',
  channels
});

export const addChannel = channel => ({
  type: 'ADD_CHANNEL',
  channel
});


export const selectChannel = channel => ({
  type: 'SELECT_CHANNEL',
  channel
});

export const changeChannel = channel => {

}

export const joinChannels = (channels, socket) => {
  console.log('in join channels', channels);
  console.log(socket);
  channels.forEach(channel => {
    socket.emit('subscribe', channel.id);
  });
}

// export const requestChannels = room => {
//   type: 'REQUEST_CHANNELS',
//   room
// }

export const fetchChannels = roomId => {
  return (dispatch, getState) => {
    axios.get(`/api/rooms/${roomId}/channels`)
      .then((res) => {
        dispatch(setChannels(res.data));
      })
      .then(() => {
        dispatch(joinChannels(getState().channels), getState().socket);
      })
  };
};
