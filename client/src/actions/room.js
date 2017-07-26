export const selectRoom = room => ({
  type: SELECT_ROOM,
  room
});

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