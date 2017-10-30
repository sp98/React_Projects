import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/Home';
import MyCamera from './components/MyCamera';

export default class Routes extends Component {
  render() {
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home" initial />
          <Scene key="capture" component={MyCamera} title="Capture" />
        </Scene>
      </Router>
    );
  }
}
