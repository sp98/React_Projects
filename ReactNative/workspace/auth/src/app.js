import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

  state = { loggedIn: null }; //Not sure if user is logged in.

  // life cycle method
  componentWillMount() {
    // configuration for firbase to connect to an APP
   firebase.initializeApp({
    apiKey: 'AIzaSyBfIwyg9FRcOAiHi_hfG5YR_r5sK7tfCeg',
    authDomain: 'auth-15281.firebaseapp.com',
    databaseURL: 'https://auth-15281.firebaseio.com',
    projectId: 'auth-15281',
    storageBucket: 'auth-15281.appspot.com',
    messagingSenderId: '303915011640',
  });

//This function gets called when the user logs in or logs out successfully.
  firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     this.setState({ loggedIn: true });
   } else {
     this.setState({ loggedIn: false });
   }
  });
  }
// when the use presses the logout button
onButtonPress() {
  this.setState({ loggedIn: false });
}
// show content based on user Authentication
renderContent() {
  switch (this.state.loggedIn) {
    case true:
      return (
        <CardSection>
          <Button
             onPress={this.onButtonPress.bind(this)} text='Log Out'
             //onPress={ () => firebase.auth.signOut()} text='Log Out'
          />
        </CardSection>
      );
    case false:
      return <LoginForm />;
    default:
      return <Spinner style={{ marginTop: 100 }} size='large' />;
  }
}


  render() {
    return (
      <View>
      <Header headerText="Authentication" />
      {this.renderContent()}
      </View>
    );
  }
}

export default App;
