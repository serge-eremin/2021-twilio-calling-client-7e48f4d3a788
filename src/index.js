import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducers from './reducers'
import './index.css';
import Root from './root';
import sagas from './saga'

import {composeWithDevTools} from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware( sagaMiddleware ))
)

sagaMiddleware.run( sagas )

   ReactDOM.render(
   <Root store={ store } />,
  document.getElementById('root'));

