import axios from 'axios';

// A mock function to mimic making an async request for data
export async function fetchQrawers({ token }) {

  // let token

  await axios.get('http://localhost:3001/api/qrawer/', {
    headers: { 'authorization': token },
  })
    .then(function (response) {
      qrawers = response.data
    })
    .catch(function (error) {
      console.log(error);
    });

  return qrawers
}

export async function addQrawer({ token, name }) {

  const config = {
    method: 'POST',
    url: 'http://localhost:3001/api/qrawer/',
    headers: { 'authorization': token },
    data: { 'name': name }
  }


  console.log('sending qrawer with token', name, token)

  await axios(config)
    .then(function (response) {
      console.log('received response:', response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function addShelf({ token, shelfName, qrawerId }) {

  const config = {
    method: 'POST',
    url: 'http://localhost:3001/api/shelves/',
    headers: { 'authorization': token },
    data: { 'name': shelfName, 'containedIn': qrawerId }
  }


  console.log('sending qrawer with token', shelfName, 'to qrawer:', qrawerId)

  await axios(config)
    .then(function (response) {
      console.log('received response:', response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function addItem({ token, itemName, itemCount, shelfId }) {

  const config = {
    method: 'POST',
    url: 'http://localhost:3001/api/items/',
    headers: { 'authorization': token },
    data: { 'name': itemName, 'count': itemCount, 'containedIn': shelfId }
  }


  console.log('sending item with token', itemName, 'to shelf:', shelfId)

  await axios(config)
    .then(function (response) {
      console.log('received response:', response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

