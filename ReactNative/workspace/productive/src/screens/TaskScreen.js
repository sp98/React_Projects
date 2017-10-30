import React from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import TaskListItem from './TaskListItem';


class TaskScreen extends React.Component {

  /* Navigtor will the show the configuration shown in NavigationOptions to
  configure the navigation.
  */
  static navigationOptions = ({ navigation }) => ({
      title: 'Tasks',
      headerTintColor: 'black',
      left: null,
      headerRight:
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
      title="Add"
      onPress={() => { navigation.navigate('createTask'); }}
      backgroundColor="rgba(0, 0, 0, 0)"
      color="rgba(0, 122, 255, 1)"
      />
      <Button
      title="Delete"
      onPress={() => { navigation.navigate('createTask'); }}
      backgroundColor="rgba(0, 0, 0, 0)"
      color="rgba(0, 122, 255, 1)"
      />
      </View>

    })

// intializing the state of the variable.
  state = { tasks: [], selectedTasks: [] };

  componentWillMount() {
    //console.log(this.state.tasks);
    this.fetchData();
  }

  fetchData = async () => {
  const createDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  await AsyncStorage.getItem(createDate)
  .then(req => JSON.parse(req))
  .then(json => this.setState({ tasks: json }))
  .catch(() => this.setState({ tasks: null }));
  }

  renderRow() {
    const { navigate } = this.props.navigation;
    const { noTaskTextStyle } = styles;
    if (this.state.tasks === null || this.state.tasks.length === 0) {
      return <Text style={noTaskTextStyle}> No Tasks Created Today </Text>;
    } else if (this.state.tasks.length > 0) {
      return this.state.tasks.map((task, index) =>
       <TaskListItem
       id={index}
       key={index}
       task={task}
       navigate={navigate}
       />
     );
    }
  }

  render() {
    return (
      <ScrollView>
      {this.renderRow()}
      </ScrollView>
    );
  }
}

const styles = {
  noTaskTextStyle: {
    flex: 1,
    aligntItems: 'center',
    flexDirection: 'row',
  }
};

export default TaskScreen;
