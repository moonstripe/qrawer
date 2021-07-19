const db = require('./../model');
const jwt = require('jwt-simple');
// const { config } = require('./../config');


const tokenForUser = function(user){
  const timestamp = new Date().getTime();
  // subject and issued at
  // What this returns will be the payload that we pass into jwt strategy
  // This encodes the token with the secret
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};



module.exports = {
  signUp: async (req, res) => {

    const { email, username, password } = req.body;
    // If they don't give an email or password, return early
    if(!username || !email || !password) {
      return res.status(422).json({ error: 'you must provide username, email and password' });
    }
    try {
      // See if there's an existing user.
      const existingUser = await db.User.findOne({ email });
      // If a user with email does exist, throw an error;
      if(existingUser) {
        return res.status(422).json({ error: 'Email is in use '});
      }
      // Create a new user
      const user = new db.User({ email, username, password });
      // Save user to database
      await user.save();
      res.json({ token: tokenForUser(user) });
    } catch(e) {
      console.log(e);
      res.status(404).json({ e });
    }
  },

  signIn: (req, res) => {
    // User already has given us their email and pass.
    // We just need to give them a token
    console.log('signed in user', req.user)
    res.send({ token: tokenForUser(req.user)});
  }
};
