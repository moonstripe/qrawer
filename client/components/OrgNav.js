import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Text, ScrollView, View } from "react-native"
import { TextInput, Button } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from "../features/signin/authSlice";
import { newQrawerAsync } from './../features/qrawer/qrawerSlice';
import { createStackNavigator } from '@react-navigation/stack';
import { OrgNavList } from "./OrgNavList";

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
        </Stack.Navigator>
    )
}

