const router = require('express').Router();
const qrawerController = require('../../controllers/qrawerController');
const passportService = require('../../services/passport');
const passport = require('passport');

const authMiddlewares = require('../../middlewares/authMiddlewares');

router.route('/')
    .get(authMiddlewares.requireAuth, qrawerController.findAllQrawers)
    .post(authMiddlewares.requireAuth, qrawerController.addQrawer);

router.route('/:qrawerId')
    .get(authMiddlewares.requireAuth, qrawerController.findOneQrawer)
    .post(authMiddlewares.requireAuth, qrawerController.editQrawer)
    .delete(authMiddlewares.requireAuth, qrawerController.deleteQrawer);

module.exports = router;