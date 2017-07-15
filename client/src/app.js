import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';	

import Main from './components/Main';
import rootReducer from './reducers';

const createStoreWithMiddleWare = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleWare(rootReducer)}>
    <Main/>
  </Provider>
  , document.getElementById('root'));
