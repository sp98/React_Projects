import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class Home extends Component {
  render() {
    return (
      <CardSection>
      <Button
       text="Take Picture"
       onPress={Actions.capture()}
      />
      </CardSection>
    );
  }
}

export default Home;
