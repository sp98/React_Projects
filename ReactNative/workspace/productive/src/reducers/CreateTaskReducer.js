import { TASK_CREATED, TASK_SAVED } from '../actions/types';

const INITIAL_STATE = { taskName: '', status: '', createdAt: '' };

export default (state = INITIAL_STATE, action) => {
 //console.log(` Inside Reducer with  ${action.payload.value}`);
 switch (action.type) {
   case TASK_CREATED: {
    // console.log(`TASK_CREATED action is intiated with - ${action.payload.taskName}`);
     return action.payload;
   }
   case TASK_SAVED: {
    // console.log('TASK_CREATED action is intiated.');
     return INITIAL_STATE;
   }

   default:
   return state;

 }
};
