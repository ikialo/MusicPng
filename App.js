/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  View,
  Button,

} from 'react-native';

import SignIn from './App/Screen/SignIn';
import Loading from './App/Screen/Loading'
import Main from './App/Screen/Main'
import Login from './App/Screen/Login'
import MusicPlayer from './App/Screen/MusicPlayer'
import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';






const NavStack = createSwitchNavigator({
  Home: Loading,
  SignIn: SignIn,
  Main:{
    screen: Main,
    navigationOptions :{
      headerMode: true
    }
  } ,
  Login: Login,
  MusicPlayer: MusicPlayer

})

const styles = StyleSheet.create({

});

export default createAppContainer(NavStack);
