import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';	

import Main from './components/Main';
import rootReducer from './reducers';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
// console.log(createStoreWithMiddleWare);

const store = createStore(
   rootReducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>
  , document.getElementById('root'));
