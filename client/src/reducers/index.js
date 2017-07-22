import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import socket from './socket';
import channels from './channels';
import currentChannel from './currentChannel';
import profiles from './profiles';

const rootReducer = combineReducers({
  user,
  socket,
  messages,
  channels,
  currentChannel,
  profiles
});

export default rootReducer;