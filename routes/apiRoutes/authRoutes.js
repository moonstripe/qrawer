const router = require('express').Router();
const authController = require('./../../controllers/authController');


const authMiddlewares = require('./../../middlewares/authMiddlewares');

router.route('/signup')
  .post(authController.signUp);

router.route('/signin')
  .post(authMiddlewares.requireSignIn, authController.signIn);



router.route('/test')
  .get(authMiddlewares.requireAuth, (req, res) => {
    console.log(req.user);
    res.send(req.user); 
  });
module.exports = router;
