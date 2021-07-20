import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Text, ScrollView, View } from "react-native"
import { List } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './../features/signin/authSlice';
import { Button } from "react-native-paper";
import { render } from "react-dom";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const OrgView = ({ navigation, route }) => {
    const { qrawerId } = route.params;
    const [qrawer, setQrawer] = useState({})
    const [shelves, setShelves] = useState([])
    const token = useSelector(selectToken)

    useEffect(() => {
        const getSingleQrawer = async () => {
            const response = await axios.get(`http://localhost:3001/api/qrawer/${qrawerId}`, {
                headers: {
                    'authorization': token
                }
            })
            setQrawer(response.data)
            console.log('got single qrawer')
        }

        const getShelvesFromQrawer = async () => {
            console.log('started getting shelves from qrawer:', qrawerId)
            try {
                const res = await axios.get(`http://localhost:3001/api/shelves/${qrawerId}`, {
                    headers: {
                        'authorization': token
                    },
                })
                // console.log('gsfq:', res.data);
                setShelves(res.data)
                console.log('got shelves from qrawer')

            } catch (e) {
                console.log('get shelves', e)
            }

        }

        console.log(qrawerId)

        getSingleQrawer();
        getShelvesFromQrawer();

    }, [])

    const handleDelete = (id) => {
        console.log(id)
        return axios.delete(`http://localhost:3001/api/shelves/${id}`, { headers: { 'authorization': token } })
    }

    return (
        <ScrollView>
            {qrawer ? (<>
                <Text>You're viewing {qrawer['name']}</Text>
                <Text>Id: {qrawer['_id']}</Text>
                <Text>There are {qrawer['shelves']?.length} shelves in this qrawer</Text>
                {shelves?.map((q, i) => (
                    <List.Item
                        key={i}
                        title={q['name']}
                        right={props => <Button {...props} icon="delete" onPress={(e) => handleDelete(q["_id"])} />}
                    />
                ))}
                <List.Item
                    onPress={() => navigation.navigate("New Shelf", { qrawerId: qrawer['_id'] })}
                    title='add new shelf' />
            </>) : null

                // add new shelf option
            }
        </ScrollView>

    )
}