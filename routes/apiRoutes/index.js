const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const qrawerRoutes  = require('./qrawerRoutes');
const shelfRoutes = require('./shelfRoutes')

const authMiddlewares = require('./../../middlewares/authMiddlewares');



router.use('/auth', authRoutes);
router.use('/qrawer', qrawerRoutes);
router.use('/shelves', shelfRoutes);

module.exports = router;