import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Text, ScrollView, View } from "react-native"
import { List } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux';
import { signin, signup, signout, selectToken, signinAsync, signupAsync } from './../features/signin/authSlice';
import { Button } from "react-native-paper";
import { render } from "react-dom";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const ShelfView = ({ navigation, route }) => {
    const { shelfId } = route.params;
    const [shelf, setShelf] = useState({})
    const [items, setItems] = useState([])
    const token = useSelector(selectToken)

    useEffect(() => {
        const getSingleShelf = async () => {
            const response = await axios.get(`http://localhost:3001/api/shelves/s/${shelfId}`, {
                headers: {
                    'authorization': token
                }
            })
            setShelf(response.data)
            console.log('got single shelf,', response.data)
        }

        const getItemsFromShelf = async () => {
            console.log('started getting item from shelf:', shelfId)
            try {
                const res = await axios.get(`http://localhost:3001/api/items/${shelfId}`, {
                    headers: {
                        'authorization': token
                    },
                })
                // console.log('gsfq:', res.data);
                setItems(res.data)
                console.log('got items from shelf')

            } catch (e) {
                console.log('get items', e)
            }

        }

        getSingleShelf();
        getItemsFromShelf();

    }, [])

    const handleDelete = (id) => {
        console.log(id)
        return axios.delete(`http://localhost:3001/api/items/i/${id}`, { headers: { 'authorization': token } })
    }

    return (
        <ScrollView>
            {shelf ? (<>
                <Text>You're viewing {shelf['name']}</Text>
                <Text>Id: {shelf['_id']}</Text>
                <Text>There are {shelf['items']?.length} items in this shelf</Text>
                {items?.map((q, i) => (
                    <List.Item
                        key={i}
                        title={q['name']}
                        right={props => <Button {...props} icon="delete" onPress={(e) => handleDelete(q["_id"])} />}
                    />
                ))}
                <List.Item
                    onPress={() => navigation.navigate("New Item", { shelfId })}
                    title='add new item' />
            </>) : null

                // add new shelf option
            }
        </ScrollView>

    )
}