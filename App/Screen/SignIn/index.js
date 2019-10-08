import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import auth, { firebase } from '@react-native-firebase/auth';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MydatePicker from './MyDatePicker'


import database from '@react-native-firebase/database';
   



var radio_props = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 }
];

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+675',
      confirmResult: null,
      value : null,
      date:"2016-05-15",
      gender : null, 
      name : null

    };
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user.toJSON(),

        });



      } else {
        // User has been signed out, reset the state
        this.setState({

          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+675',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  updateUserInfo = ()=> {
    const uid = auth().currentUser.uid;
 
    // Create a reference
    const ref = database().ref(`/users/${uid}`);

    auth().currentUser.updateProfile({
      displayName:this.state.name
    })
   
    ref.set({
      uid,
      name: this.state.name,
      dob: this.state.date,
      gender: this.state.gender
    });

    this.props.navigation.navigate('Main');
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  ContinueMain = () => {
    this.props.navigation.navigate('Main')

  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          keyboardType={'number-pad'}
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          keyboardType={'number-pad'}
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  register() {

    if (this.state.user.displayName == null) {
      return (
        <View style={{ marginTop: 25, padding: 25 }}>
          <Text>Register</Text>
          <TextInput
            autoFocus
            style={{ height: 40, marginTop: 15, marginBottom: 15 }}
            onChangeText={value => this.setState({ name: value })}
            placeholder={'Name ... '}
          />
      
          <View>
            <Text>Date of Birth</Text>
            <MydatePicker></MydatePicker>
            <Text >Gender</Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.setState({ gender: value }) }}
            />
          </View>

          <Button title="Confirm Code" color="#841584" onPress={this.updateUserInfo} />


        </View>
      );

    }
    else {
      return (
        <View
          style={{
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#77dd77',
            flex: 1,
          }}
        >

          <Text style={{ fontSize: 25 }}>Signed In!</Text>
          <Text>{JSON.stringify(this.state.user.displayName)}</Text>
          <Button title="Continue" color="red" onPress={this.ContinueMain} />
          <Button title="Sign Out" color="red" onPress={this.signOut} />

        </View>
      )

    }

  }


  render() {
    const { user, confirmResult } = this.state;


    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}


        {user && this.register()}

      </View>
    );
  }
}