import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { Link } from 'react-router-native';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Headbar = () => {

    useEffect(() => {
        console.log(getStatusBarHeight())
    })

    return (

        <Appbar style={styles.headbar}>

            <Appbar.Action
                icon="menu"
            onPress={() => console.log('Pressed menu')}
            />

            <TextInput
                style={styles.input} />

            <Appbar.Action
                icon="qrcode"
            onPress={() => console.log('Pressed camera')}
            />
        </Appbar>
    )
};

const styles = StyleSheet.create({
    headbar: {
        flex: 0.1,
        left: 0,
        right: 0,
        paddingTop: getStatusBarHeight(),
        justifyContent: 'flex-start'
    },
    input: {
        height: 40,
        borderRadius: 4,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width * 0.7,
        margin: 12,
        backgroundColor: 'white'
    },
})