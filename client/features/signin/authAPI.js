import axios from 'axios';

// A mock function to mimic making an async request for data
export async function fetchSignIn({email, password}) {

  // let token

  console.log('sending email and pass', email, password)

  await axios.post('http://localhost:3001/api/auth/signin', {
    email: email,
    password: password
  })
  .then(function (response) {
    token = response.data.token
  })
  .catch(function (error) {
    token = null;
    console.log(error);
  });

  return token
}

export async function fetchSignUp({email, username, password}) {

  let token

  console.log('sending email, user and pass', email,username, password)

  await axios.post('http://localhost:3001/api/auth/signup', {
    email: email,
    username: username,
    password: password
  })
  .then(function (response) {
    console.log('received token:', response.data.token)
    token = response.data.token
  })
  .catch(function (error) {
    token = null;
    console.log(error);
  });

  return token
}

