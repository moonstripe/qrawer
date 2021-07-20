import React, { useState } from "react";
import { View } from "react-native"
import { TextInput, Button } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from "../features/signin/authSlice";
import { newQrawerAsync, newShelfAsync } from './../features/qrawer/qrawerSlice';
import { createStackNavigator } from '@react-navigation/stack';
import { OrgNavList } from "./OrgNavList";
import { OrgView } from "./OrgView";

const Stack = createStackNavigator();

const NewQrawer = ({ navigation }) => {
    const token = useSelector(selectToken)
    const dispatch = useDispatch();
    const [qrawerName, setQrawerName] = useState('');

    return (
        <View>
            <TextInput onChangeText={(name) => setQrawerName(name)} placeholder="qrawer name"></TextInput>
            <Button onPress={() => {
                dispatch(newQrawerAsync({token: token, name: qrawerName}))
                console.log(navigation)
                navigation.navigate("Qrawers")
                }}>Add new Qrawer</Button>
        </View>
    )
}

const NewShelf = ({ navigation, route }) => {
    const { qrawerId } = route.params;
    const token = useSelector(selectToken)
    const dispatch = useDispatch();
    const [shelfName, setShelfName] = useState('');

    return (
        <View>
            <TextInput onChangeText={(name) => setShelfName(name)} placeholder="shelf name"></TextInput>
            <Button onPress={() => {
                dispatch(newShelfAsync({token: token, shelfName, qrawerId}))
                navigation.navigate("Qrawers")
                }}>Add new Shelf</Button>
        </View>
    )
}

export const OrgNav = ({ navigation }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Qrawers"
                component={OrgNavList}
            />
            <Stack.Screen
                name="New Qrawer"
                component={NewQrawer}
            />
            <Stack.Screen
                name="Single Qrawer"
                component={OrgView}
            />
            <Stack.Screen
                name="New Shelf"
                component={NewShelf}
            />
        </Stack.Navigator>
    )
}

