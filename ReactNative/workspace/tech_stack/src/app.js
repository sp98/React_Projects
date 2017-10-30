import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'; // communication b/w react and redux
import { createStore } from 'redux';  //function that creates a store
import reducers from './reducers';  // no need to mention the index.js file
//name here because passing the folder name implies that we want to use the index file
import { Header } from './components/common';
import LibraryList from './components/LibraryList';

const App = () => {

  return (
    /*provider can only one child component
    - provider helps in communication between react and redux.
    - provider helps the data stored in, as state, by the store, to be used
      in the application. .
    */
    <Provider store={createStore(reducers)}>
    <View style={{ flex: 1 }}>
      <Header headerText="Tech Stack" />
      <LibraryList />
    </View>
    </Provider>
  );
};

export default App;
