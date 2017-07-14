import { combineReducers } from 'redux';
// import todos from './todos';
import MessagesReducer from './MessageListReducer'

const rootReducer = combineReducers({
  messages: MessagesReducer
});

export default rootReducer;