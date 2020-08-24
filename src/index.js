import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import libraryReducer from "./store/reducers/library";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchLibrary } from "./store/sagas";
import { Provider } from "react-redux";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({ library: libraryReducer });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchLibrary);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
