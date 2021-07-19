import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './authSlice'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const SignOut = () => {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    return (
        <View>
            <Text>{token}</Text>
            <Button style={{ height: 100, width: 250 }} onPress={() => dispatch(signout())}>sign out</Button>
        </View>
    )
}

const SignInEmail = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();


    const handleSignIn = (e) => {
        dispatch(signinAsync())
    }

    return (
        <View>
            <TextInput
                name="email"
                keyboardType="email-address"
                placeholder="email"
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                name="password"
                placeholder="password"
                onChangeText={password => setPassword(password)}
            />
            <Button style={{ height: 100, width: 150 }} onPress={() => dispatch(signinAsync({email, password}))}>sign in</Button>
            <Button style={{ height: 100, width: 150 }} onPress={() => navigation.navigate('Sign Up')}>sign up</Button>
        </View>
    )
}

const SignUpEmail = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();


    return (
        <View>
            <TextInput
                name="email"
                keyboardType="email-address"
                placeholder="email"
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                name="username"
                placeholder="username"
                onChangeText={username => setUsername(username)}
            />
            <TextInput
                name="password"
                placeholder="password"
                onChangeText={password => setPassword(password)}
            />
            <Button style={{ height: 100, width: 150 }} onPress={() => navigation.navigate('Sign In')}>sign in</Button>
            <Button style={{ height: 100, width: 150 }} onPress={() => dispatch(signupAsync({email, username, password}))}>sign up</Button>
        </View>
    )
}

export function SignIn() {
    const token = useSelector(selectToken);

    return (
        <Stack.Navigator>
            {
                token ? (
                    <Stack.Screen name='Sign Out' component={SignOut} />
                ) : (
                    <>
                        <Stack.Screen name="Sign In" component={SignInEmail} />
                        <Stack.Screen name="Sign Up" component={SignUpEmail} />
                    </>
                )
            }

        </Stack.Navigator>
    )
}