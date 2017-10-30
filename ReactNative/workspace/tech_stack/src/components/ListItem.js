import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';  // importing all the action creators.
/*
importing many things from a file at the same time we can use this syntax:
import * as <> from <>
*/

class ListItem extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    if (this.props.expanded) {
      return (
        <CardSection>
        <Text style={{ flex: 1 }} >
         {this.props.library.description}
         </Text>
        </ CardSection>
      );
    }
  }
  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library;
    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectLibrary(id)}
      >
      <View>
        <CardSection>
          <Text style={titleStyle}>
             {title}
          </Text>
         </CardSection>
         {this.renderDescription()}
        </View>
      </ TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  }
};

/*
This function apart from 'state' also takes 'ownProps' arguments
that consists of the props passed to this component.
- this funciton reruns whenever our application state changes and re render
  the application.
*/
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryID === ownProps.library.id;
  return { expanded };
};
export default connect(mapStateToProps, actions)(ListItem);
/* Connect method takes two arguments
1. mapStateToProp: provide our app state to the component as props.
2. actions: Bind all the actions to this component as props.
here we are passing the action creator (action) to the component as a prop.
*/
