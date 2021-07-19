import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './../features/signin/authSlice';

import { Home } from './Home'
import { OrgNav } from './OrgNav'

const Drawer = createDrawerNavigator();

export const LeftDrawer = () => {

  const token = useSelector(selectToken)


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
        />
        {
          token ? <Drawer.Screen name="OrgNav" component={OrgNav} /> : null

        }
        
      </Drawer.Navigator>
    </NavigationContainer>
  )
};