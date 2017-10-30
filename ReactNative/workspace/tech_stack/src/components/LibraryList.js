import React, { Component } from 'react';
// Connect is a tool that helps a component to connect to the redux store
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './ListItem';

class LibraryList extends Component {
 componentWillMount() {
   const ds = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2
   });

   this.dataSource = ds.cloneWithRows(this.props.libraries);
 }

//how to render a single element.
 renderRow(library) {
  return <ListItem library={library} />;
 }

  render() {
    return (
      <ListView
      dataSource={this.dataSource}
      renderRow={this.renderRow}
      />
    );
  }
}

// take our global state (redux Store) object and provide them as props
// in our library list.
const mapStateToProps = state => {
  // 'state' is the application state that sits inside our redux store.
  //Any object returned from mapstateToProps will get added to component as props.
  return { libraries: state.libraries };
  // this return value gets added to the component above as props.
  // After returning this value, the LibraryList Component will have a
  //  prop of 'libraries' and value of libraries returned form state
};

export default connect(mapStateToProps)(LibraryList);
/** What Connect function Does?
- It helps to our react component to get access to the application state
 created by the redux reducer.

  The meaning of the connect method syntax above?
    1. calls a function connect.
    2. connect returns a function that immediately calls with LibraryList as
       argument

    Connect Function takes two arguments:
    1. mapStateToProps: Converts the global state object (redux store)
       and provide them as props inside our component.
**/
