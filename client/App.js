import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QRscanner, Headbar, Home, OrgNav, NewOrg, LeftDrawer, Logo } from './components'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './features/signin/authSlice';

// react navigation

export default function App() {
  // const dispatch = useDispatch();r
  // const token = useSelector(selectToken)



  return (
    <Provider store={store}>
      <LeftDrawer/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
  },
});

