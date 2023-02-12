import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import * as serviceWorker from './serviceWorker'

// import { configureStore} from 'redux/toolkit';
import { applyMiddleware, createStore} from 'redux';
import rootReducer from './reducer/RootReducer';
import{Provider } from 'react-redux';

const inatialState={

}

const middelwares = [thunk]

const store = createStore(rootReducer, inatialState, applyMiddleware(...middelwares));
// const store = configureStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(
  <Provider store={store}>
     <App />
  </Provider>,
 
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default store;