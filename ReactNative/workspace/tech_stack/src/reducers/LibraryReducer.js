
import data from './LibraryList.json';  // need to specify the file extension if its other than js

export default () => data;
// This reducer will only dispatch a list of data and nothing else as its
// not bound to a particular action.
