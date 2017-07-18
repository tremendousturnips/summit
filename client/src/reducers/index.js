import { combineReducers } from 'redux';
// import todos from './todos';
import messages from './messages';
import user from './user';
import socket from './socket';

const rootReducer = combineReducers({
  user,
  messages,
  socket
});

export default rootReducer;