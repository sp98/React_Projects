import { combineReducers } from 'redux';
import CreateTaskReducer from './CreateTaskReducer';
import SelectedTaskReducer from './SelectedTaskReducer';

export default combineReducers({
    taskDetails: CreateTaskReducer,
    selectedTask: SelectedTaskReducer
  });
