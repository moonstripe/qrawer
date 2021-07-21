const router = require('express').Router();
const itemController = require('../../controllers/itemController');
const passportService = require('../../services/passport');
const passport = require('passport');

const authMiddlewares = require('../../middlewares/authMiddlewares');

router.route('/')
    .post(authMiddlewares.requireAuth, itemController.addItem);

router.route('/:shelfId')
    .get(authMiddlewares.requireAuth, itemController.findAllItemsByShelf);

router.route('/i/:itemId')
    .get(authMiddlewares.requireAuth, itemController.findOneItem)
    .post(authMiddlewares.requireAuth, itemController.editItem)
    .delete(authMiddlewares.requireAuth, itemController.deleteItem);

module.exports = router;