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