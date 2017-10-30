import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
 return (
   // add global style object for all the scenes
   /*The key attribute is really important for navigation.
    It creates a method with the same name and we can use it as Actions.login()
    for navigation.

    We can keep the scenes as a nested in order to take control of the back
    button navigation form them.

    With nested Scene, moving from login to employeeList will be using
    Actions.main().employeeList()
   */
  <Router sceneStyle={{ paddingTop: 65 }}>
  <Scene key="auth">
    <Scene key='login' component={LoginForm} title="Please Login" initial />
  </Scene>

  <Scene key="main">
    <Scene
    key='employeeList'
    component={EmployeeList}
    title="Employees"
    rightTitle='Add'
    onRight={() => Actions.employeeCreate()}
    />

    <Scene
    key="employeeCreate"
    component={EmployeeCreate}
     title="Create Employee"
    />

    <Scene
     key="employeeEdit"
     component={EmployeeEdit}
     title="Edit Employee"
    />

  </Scene>
  </Router>

 );
};

export default RouterComponent;
