import {
  TASK_CREATED,
  TASK_SAVED,
  TASK_SELECTED } from './types';

export const createTaskAction = (taskName, status, createdAt) => {
  //console.log(`inside action creator with new task ${taskName} , ${status}, ${createdAt}`);
  return {
      type: TASK_CREATED,
      payload: {
        taskName,
        status,
        createdAt
      }
    };
};

export const taskSavedAction = () => {
  //console.log('insided action creator when the task was saved successfully');
  return {
    type: TASK_SAVED,
  };
};


export const selectedTaskAction = (taskID) => {
  console.log(`user has selected the task in row - ${taskID}`);
  return {
    type: TASK_SELECTED,
    payload: taskID
  };
};

export const descriptionExpandedAction = (taskID) => {
  return {
    type: 'test',
    payload: taskID
  };
};
