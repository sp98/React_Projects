import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,    //key will be the property of the state
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer
});
