import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Text, ScrollView, View } from "react-native"
import { List } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './../features/signin/authSlice';
import { Button } from "react-native-paper";
import { render } from "react-dom";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const OrgNavList = ({ navigation }) => {
    const token = useSelector(selectToken)
    const [qrawers, setQrawers] = useState([])

    useEffect(() => {
        const getQrawers = async () => {
            const response = await axios.get('http://localhost:3001/api/qrawer/', {
                headers: {
                    'authorization': token
                }
            })
            // console.log(response.data)
            setQrawers(response.data)
        }

        getQrawers();

    }, [qrawers])

    const handleDelete = (id) => {
        console.log(id)
        return axios.delete(`http://localhost:3001/api/qrawer/${id}`, {headers: {'authorization': token}})
    }

    return (

        <ScrollView>
            {
                qrawers.map((q, i) => <List.Item
                    key={q["_id"]}
                    title={q["name"]}
                    right={props => <Button {...props} icon="delete" onPress={(e) => handleDelete(q["_id"])}/>}
                />)
            }
            <List.Item onPress={() => navigation.navigate("New Qrawer")} title="add new qrawer" />
        </ScrollView>
    )
}