import { combineReducers } from 'redux';
// import todos from './todos';
import MessagesReducer from './messageListReducer'

const rootReducer = combineReducers({
  messages: MessagesReducer
});

export default rootReducer;