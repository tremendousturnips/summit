import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import socket from './socket';
import channels from './channels';
import currentChannel from './currentChannel';
import profiles from './profiles';
import currentRoom from './currentRoom';
import toggleVideo from './toggleVideo';
import showFriendList from './showFriendList';
import friends from './friends';

const rootReducer = combineReducers({
  user,
  socket,
  messages,
  channels,
  currentChannel,
  profiles,
  currentRoom,
  toggleVideo,
  showFriendList,
  friends
});

export default rootReducer;