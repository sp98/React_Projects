import React from 'react';
import { View, AsyncStorage, Keyboard } from 'react-native';
import { Input, Button } from '../components/common/';

class CreateTaskScreen extends React.Component {

/*
 Creating class level property - navigationOptions for the navigation menu.
*/
  static navigationOptions = () => ({
      title: 'Add Task',
    })

// Intializing the state.
  state = { newTask: '' };


  onSavePress(task) {
    Keyboard.dismiss(); //dismiss the keyboord when save is pressed
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    this.saveData(task, date);
  }

  saveData = async (task, date) => {
   const { navigate } = this.props.navigation;
   console.log('test');
   console.log(`save is pressed with task ${task} and date  ${date}`);
   let taskList = await AsyncStorage.getItem(date);
   if (taskList) {
     taskList = JSON.parse(taskList).concat(task);
     await AsyncStorage.setItem(date, JSON.stringify(taskList))
     .then(() => navigate('task'));
   } else {
     let newtaskList = [];
     newtaskList.push(task);
     await AsyncStorage.setItem(date, JSON.stringify(newtaskList))
     .then(() => navigate('task'));
   }
  }

  showSaveButton(task) {
   if (task) {
     return (
       <Button
       text='Save'
       onPress={() => this.onSavePress(task)}
       />
     );
   }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
      <Input
      placeHolder='Enter Task Name'
      onChangeText={(text) => this.setState({ newTask: text })}
      />
      {this.showSaveButton(this.state.newTask)}
      </View>


    );
  }
}
export default CreateTaskScreen;
