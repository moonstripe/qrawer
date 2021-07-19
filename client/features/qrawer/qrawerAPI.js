import axios from 'axios';

// A mock function to mimic making an async request for data
export async function fetchQrawers({token}) {

  // let token

  await axios.get('http://localhost:3001/api/qrawer/', {
    headers: {'authorization': token},
  })
  .then(function (response) {
    qrawers = response.data
  })
  .catch(function (error) {
    console.log(error);
  });

  return qrawers
}

export async function addQrawer({token, name}) {

    const config = {
        method: 'POST',
        url: 'http://localhost:3001/api/qrawer/',
        headers: {'authorization': token},
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

