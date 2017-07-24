import { combineReducers } from 'redux';
import messages from './messages';
import user from './user';
import socket from './socket';
import channels from './channels';
import currentChannel from './currentChannel';
<<<<<<< HEAD
import profiles from './profiles';
import currentRoom from './currentRoom';
=======
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
import toggleVideo from './toggleVideo';

const rootReducer = combineReducers({
  user,
  socket,
  messages,
  channels,
  currentChannel,
<<<<<<< HEAD
  profiles,
  currentRoom,
=======
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
  toggleVideo
});

export default rootReducer;