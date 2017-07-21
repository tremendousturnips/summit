import { combineReducers } from 'redux';
// import todos from './todos';
import messages from './messages';
import user from './user';
import socket from './socket';
import channels from './channels';
import currentChannel from './currentChannel';

const rootReducer = combineReducers({
  user,
  messages,
  socket,
  channels,
  currentChannel
});

export default rootReducer;