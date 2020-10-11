import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {combineReducers} from 'redux';


const default_postings = [
    {
        id : 1,
        position: 'Webudvikler',
        employer: 'Datagraf AS'
    },
    {
        id : 2,
        position: 'Programmør',
        employer: 'Temponizer Aps'
    }
];

const postings_reducer = (state = default_postings, action) => {
  switch(action.type){
      default: 
          return state
  }
}

const root_reducer = combineReducers({
  postings_reducer
})

const store = createStore( root_reducer );

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
