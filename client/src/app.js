import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import Main from './components/Main';
import rootReducer from './reducers';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
// console.log(createStoreWithMiddleWare);

// Grab the state from a global variable injected into the server-generated HTML
const initialState = {
  user: window.__PRELOADED_STATE__,
  socket: io()
};


// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
);

// const store = createStore(
//   rootReducer, /* preloadedState, */
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>
  , document.getElementById('root'));
