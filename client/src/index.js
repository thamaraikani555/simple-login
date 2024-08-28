import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import App from './App';
import store from './store/store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr />
    <App />
  </Provider>,
  document.getElementById('root')
);
