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
import rooms from './rooms';
import channelsByRoom from './channelsByRoom';
import directs from './directs';

const rootReducer = combineReducers({
  user,
  socket,
  rooms,
  messages,
  channels,
  channelsByRoom,
  currentChannel,
  profiles,
  currentRoom,
  toggleVideo,
  showFriendList,
  directs,
  friends
});

export default rootReducer;