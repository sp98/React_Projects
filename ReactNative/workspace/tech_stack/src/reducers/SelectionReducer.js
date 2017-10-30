// set initial value for this reducer to return when
// the redux app first boots up. This value can't be undefined.
// so we set 'state=null' as the first argument.

export default (state = null, action) => {

switch (action.type) {
  case 'select_library':
  return action.payload;

  default:
  return state;

}
};
