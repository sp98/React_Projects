import React from 'react';
import { connect } from 'react-redux';

import { View, AsyncStorage, Keyboard } from 'react-native';
import { Input, Button } from '../components/common/';
import { createTaskAction, taskSavedAction } from '../actions';

class CreateTaskScreen extends React.Component {

/*
 Creating class level property - navigationOptions for the navigation menu.
*/
  static navigationOptions = () => ({
      title: 'Add Task',
    })


  onSavePress() {
    Keyboard.dismiss(); //dismiss the keyboord when save is pressed
    const createDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    this.saveData(createDate);
  }

  saveData = async (createDate) => {
   const { taskDetails } = this.props;
   const { navigate } = this.props.navigation;
   //console.log(`save is pressed with task ${taskDetails} and date  ${createDate}`);
   let taskList = await AsyncStorage.getItem(createDate);

   if (taskList !== null && taskList.length !== 0) {
     //console.log(`My existing Task List ${taskList.length}`);
     taskList = JSON.parse(taskList).concat(taskDetails);
     await AsyncStorage.setItem(createDate, JSON.stringify(taskList))
     .then(() => this.taskSavedSuccessfully())
     .then(() => navigate('task'));
   } else {
     let newtaskList = [];
     newtaskList.push(taskDetails);
     await AsyncStorage.setItem(createDate, JSON.stringify(newtaskList))
     .then(() => this.taskSavedSuccessfully())
     .then(() => navigate('task'));
   }
  }

  showSaveButton() {
   const { taskName } = this.props.taskDetails;
   if (taskName.length > 0) {
     //console.log(`showing save button with ${this.props.taskDetails.taskName}`);
     return (
       <Button
       text='Save'
       onPress={() => this.onSavePress()}
       />
     );
   }
  }

  userEntersTask(task) {
    //console.log('User is typing something');
    this.props.createTaskAction(task, 'pending', this.currentTime());
  }

  taskSavedSuccessfully() {
    //console.log('task saved successfully');
    this.props.taskSavedAction();
  }

  currentTime() {
    const currentdate = new Date();
    const time =
    `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

    return time;
  }

  render() {
    //console.log(`CreateTaskComponent Task rerendered with ${this.props.taskDetails.taskName}`);
    return (
      <View style={{ flex: 1 }}>
      <Input
      placeHolder='Enter Task Name'
      onChangeText={this.userEntersTask.bind(this)}
      />
      {this.showSaveButton()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(`Inside Map State to Props ${state.taskDetails.taskName}`);
  return { taskDetails: state.taskDetails };
};

// function mapDispatchToProps(dispatch) {
//   //dispatch function takes the actions and send them to all the reducers.
//    return bindActionCreators({ createTaskAction }, dispatch);
// }
export default connect(mapStateToProps, { createTaskAction, taskSavedAction })(CreateTaskScreen);
