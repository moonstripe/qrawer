const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const qrawerRoutes  = require('./qrawerRoutes');

const authMiddlewares = require('./../../middlewares/authMiddlewares');



router.use('/auth', authRoutes);
router.use('/qrawer', qrawerRoutes);

module.exports = router;