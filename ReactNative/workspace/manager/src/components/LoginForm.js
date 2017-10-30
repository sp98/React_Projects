import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  // Event handlers
  onEmailChange(text) {
    /*
    action creator to update the app level state with
    the new value that the user has typed in
    */
   this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    /*
    We could use action creator over here because we have passed it as
    an argument in the connect method below.
    */
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
      onPress={this.onButtonPress.bind(this)} text="Login"
      />
    );
  }


  render() {
    return (
      <Card>
        <CardSection>
        <Input
        label="Email"
        placeholder="email@gmail.com"
        onChangeText={this.onEmailChange.bind(this)}
        value={this.props.email}
        />
        </CardSection>

        <CardSection>
        <Input
         label="Password"
         placeholder="password"
         onChangeText={this.onPasswordChange.bind(this)}
         value={this.props.password}
        />
        </CardSection>

        <Text style={styles.errorTextStyle}>
         {this.props.error}
        </Text>

        <CardSection>
        {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};


const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};
export default connect(mapStateToProps,
  { emailChanged, passwordChanged, loginUser })(LoginForm);

/*
The connect method takes two arguments.:
1. setMapstoProps
2. Action Creator : Wiriing up the action creator gives us the access to it
inside our Component as props.
*/
