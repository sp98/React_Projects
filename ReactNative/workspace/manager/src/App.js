import React, { Component } from 'react';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; // A middleware for redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyAgx4GBlm7VKt6_QDDDaI3PR-cB2MoyDSA',
    authDomain: 'manager-8db31.firebaseapp.com',
    databaseURL: 'https://manager-8db31.firebaseio.com',
    projectId: 'manager-8db31',
    storageBucket: 'manager-8db31.appspot.com',
    messagingSenderId: '326809034758'
    };

    firebase.initializeApp(config);
  }
  render() {
    // the second argument is any initial state that we may want to pass.
    // Thrid arg is a store enhancer to add additional functionality to Redux
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
       <Provider store={store} >
        <Router />
       </Provider>
    );
  }
}

export default App;
