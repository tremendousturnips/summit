import { combineReducers } from 'redux';
// import todos from './todos';
import messages from './messages';
import user from './user';

const rootReducer = combineReducers({
  user,
  messages
});

export default rootReducer;