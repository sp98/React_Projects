import { TASK_SELECTED } from '../actions/types';

export default (state = '', action) => {
  console.log(`In Reducer with action type - ${action.payload}`);
  switch (action.type) {

    case TASK_SELECTED:
    return action.payload;

    case 'test':
    return action.payload;

    default:
    return state;
  }
};
