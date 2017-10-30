import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import TaskScreen from './screens/TaskScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';

class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      task: { screen: TaskScreen },
      createTask: { screen: CreateTaskScreen },
      editTask: { screen: EditTaskScreen }

    });
    return (
      <Provider store={createStore(reducers)}>
      <View style={{ flex: 1 }}>
      <MainNavigator />
      </View>
      </Provider>
    );
  }
}

export default App;
