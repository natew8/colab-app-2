import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './dux/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
