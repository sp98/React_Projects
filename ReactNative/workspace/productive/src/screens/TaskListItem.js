import React, { Component } from 'react';
import { View, Text, AsyncStorage, LayoutAnimation } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Card, CardSection, CheckBox } from '../components/common';
import { selectedTaskAction, descriptionExpandedAction } from '../actions/index';


class TaskListItem extends Component {

  static updatedArray = [];
  state = { selectedTasks: [] };


  componentWillMount() {
    // Not Restoring the user prefernce
    if (this.state.selectedTasks.length === 0) {
      TaskListItem.updatedArray.splice(0, TaskListItem.updatedArray.length);
    }

    // if (TaskListItem.updatedArray.length > 0) {
    //   this.setState({ selectedTasks: TaskListItem.updatedArray });
    // }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }


  check(id) {
    if (TaskListItem.updatedArray.indexOf(id) === -1) {
      TaskListItem.updatedArray.push(id);
    } else {
      TaskListItem.updatedArray = TaskListItem.updatedArray.filter(val => val !== id);
    }

    this.setState({ selectedTasks: TaskListItem.updatedArray });
  }

  //Selecting multiple Tasks
  onCheckBoxPress = (taskID) => {
   console.log(`Selected Task with ID ${taskID}`);
   this.check(taskID);
   console.log(`check if ${this.props.id} is in ${this.state.selectedTasks}`);
  }

  deleteTask = async (taskID) => {
  this.props.selectedTaskAction(taskID);
  let storedTasks = [];
  const createDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  storedTasks = await AsyncStorage.getItem(createDate)
  .then(req => JSON.parse(req));
  storedTasks.splice(this.props.selectedTask, 1);
  await AsyncStorage.setItem(createDate, JSON.stringify(storedTasks))
  .then(() => this.props.navigate('task'));
  }

  showDeleteButton() {
    if (this.state.selectedTasks.length > 0) {
      return (
        <CardSection>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
        title='Delete Selected Tasks'
        backgroundColor="rgba(0, 0, 0, 0)"
        color="rgba(0, 122, 255, 1)"
        onPress={() => { this.state.selectedTasks.map(id => this.deleteTask(id)); }}
        />
        </View>
        </CardSection>
      );
    }
  }


  renderDetails() {
   if (this.props.expanded) {
     return (
       <CardSection>
       <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
       <Text>
       {this.props.task.status}
       </Text>
       </View>

       <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
       <Text>
       {this.props.task.createdAt}
       </Text>
       </View>

       <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
       <Button
       title='x'
       backgroundColor="rgba(0, 0, 0, 0)"
       color="rgba(0, 122, 255, 1)"
       onPress={() => { this.deleteTask(this.props.id); }}
       />
       </View>

       </CardSection>
     );
   }
  }


  render() {
    return (
      <Card>
      <CardSection>
      <CheckBox
      onPress={() => this.onCheckBoxPress(this.props.id)}
      isPressed={
        this.state.selectedTasks.indexOf(this.props.id) !== -1
      }
      />
      <Text>
      {this.props.task.taskName}
      </Text>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
      title={this.props.expanded ? 'less' : 'more'}
      backgroundColor="rgba(0, 0, 0, 0)"
      color="rgba(0, 122, 255, 1)"
      onPress={() => {
        if (this.props.id === this.props.selectedTask) {
          this.props.selectedTaskAction(null);
        } else {
          this.props.selectedTaskAction(this.props.id);
        }
      }}
      />
      </View>

      </CardSection>
      {this.renderDetails()}
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedTask === ownProps.id;
  const checkboxPressed = state.selectedTask === ownProps.id;
  return { selectedTask: state.selectedTask,
          expanded,
          checkboxPressed };
};

export default connect(mapStateToProps,
   { selectedTaskAction, descriptionExpandedAction })(TaskListItem);
