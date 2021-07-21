const router = require('express').Router();
const shelfController = require('../../controllers/shelfController');
const passportService = require('../../services/passport');
const passport = require('passport');

const authMiddlewares = require('../../middlewares/authMiddlewares');

router.route('/')
    .post(authMiddlewares.requireAuth, shelfController.addShelf);

router.route('/:qrawerId')
    .get(authMiddlewares.requireAuth, shelfController.findAllShelvesByQrawer);

router.route('/s/:shelfId')
    .get(authMiddlewares.requireAuth, shelfController.findOneShelf)
    .post(authMiddlewares.requireAuth, shelfController.editShelf)
    .delete(authMiddlewares.requireAuth, shelfController.deleteShelf);

module.exports = router;