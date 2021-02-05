import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import "@fontsource/open-sans-condensed"

import { saveState } from './localStorage'
import store from './store'
import history from "./history";

import './index.css';
import App from './App';

store.subscribe(() => {
  saveState({
    store: store.getState()
  });
});

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
