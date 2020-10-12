import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import {combineReducers} from 'redux';

import reducer from "./store/reducer"

const store: Store<PostingState, PostingAction> & {
  dispatch: DispatchType
} = createStore( reducer )



 // loading component for suspense fallback
 const Loader = () => (
  <div className="App">
    <div>Loading...</div>
  </div>
);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
