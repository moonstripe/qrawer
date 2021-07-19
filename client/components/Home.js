import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, TextInput, View, Button } from "react-native";
import { QRscanner } from "./QRscanner";
import { Logo } from "./Logo";
import { AuthContext } from './AuthContext';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Counter } from '../features/counter/Counter';
import { SignIn } from '../features/signin/SignIn'
import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './../features/signin/authSlice';

const Stack = createStackNavigator();

const Front = ({ navigation }) => {
    // turn this into tutorial page
    const dispatch = useDispatch();
    const token = useSelector(selectToken)

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{token}</Text>
        <Button
            title="Go to Organizations"
            onPress={() => navigation.navigate('OrgNav')}
        />
        <Button
            title="Sign Out"
            onPress={() => dispatch(signout())}
        />
    </View>
)}


export const Home = ({ navigation }) => {
    const token = useSelector(selectToken);


    return (
            <Stack.Navigator>
                {/* logged in state ternary */}
                {!token ? (
                    <Stack.Screen 
                    name="SignIn" 
                    component={SignIn}
                    options={{
                        headerTitleContainerStyle: { paddingBottom: 15 },
                        headerTitle: () => <Logo />,
                    }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Front"
                            component={Front}
                            options={{
                                headerTitleContainerStyle: { paddingBottom: 15 },
                                headerTitle: () => <Logo />,
                                headerRight: () => (
                                    <Icon
                                        size={20}
                                        style={{ marginBottom: 15, marginRight: 44 }}
                                        onPress={() => navigation.navigate('Camera')}
                                        name="camera"
                                    />
                                ),
                            }}
                        />
                        <Stack.Screen
                            name="Camera"
                            component={QRscanner}
                            options={{
                                headerTitleContainerStyle: { paddingBottom: 15 },
                                headerTitle: () => <Logo onPress={() => navigation.navigate('Front')} />,
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
    );
}