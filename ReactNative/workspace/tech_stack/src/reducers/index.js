
// All the reducers inside the reducers folder are imported here.

import { combineReducers } from 'redux';  // To combine multiple reducers.
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  /*  key used here (Libraries, selectedLibraryID) will show up on the global state object,
  that is, following are valid keys for our application state objects:
  state.libraries: Its value would be whatever data produced by LibraryReducer
  state.selectedLibraryID: Its value would be whatever data produced by SelectionReducer
  */
  libraries: LibraryReducer,
  // here the libraris (our json data) is available as a global store that is
  // attached to the Provider tag in our app.js.
  // We need to send this data from provider to some specific component.
  selectedLibraryID: SelectionReducer
});
