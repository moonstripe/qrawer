import React, { useState } from "react";
import { View } from "react-native"
import { TextInput, Button } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from "../features/signin/authSlice";
import { newQrawerAsync, newShelfAsync, newItemAsync } from './../features/qrawer/qrawerSlice';
import { createStackNavigator } from '@react-navigation/stack';
import { OrgNavList } from "./OrgNavList";
import { OrgView } from "./OrgView";
import { ShelfView } from "./ShelfView"

const Stack = createStackNavigator();

const NewQrawer = ({ navigation }) => {
    const token = useSelector(selectToken)
    const dispatch = useDispatch();
    const [qrawerName, setQrawerName] = useState('');

    return (
        <View>
            <TextInput onChangeText={(name) => setQrawerName(name)} placeholder="qrawer name"></TextInput>
            <Button onPress={() => {
                dispatch(newQrawerAsync({ token: token, name: qrawerName }))
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
                dispatch(newShelfAsync({ token: token, shelfName, qrawerId }))
                navigation.navigate("Qrawers")
            }}>Add new Shelf</Button>
        </View>
    )
}

const NewItem = ({ navigation, route }) => {
    const { shelfId } = route.params;
    const token = useSelector(selectToken)
    const dispatch = useDispatch();
    const [itemName, setItemName] = useState('');
    const [itemCount, setItemCount] = useState(1);

    console.log('new item, shelfId:', shelfId)

    return (
        <View>
            <TextInput onChangeText={(name) => setItemName(name)} placeholder="item name"></TextInput>
            <TextInput onChangeText={(count) => setItemCount(count)} placeholder="item count" keyboardType="number-pad"></TextInput>

            <Button onPress={() => {
                dispatch(newItemAsync({ token: token, itemName, itemCount, shelfId }))
                navigation.navigate("Qrawers")
            }}>Add new Item</Button>
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
                name="Single Shelf"
                component={ShelfView}
            />
            <Stack.Screen
                name="New Shelf"
                component={NewShelf}
            />
            <Stack.Screen
                name="New Item"
                component={NewItem}
            />
        </Stack.Navigator>
    )
}

