const router = require('express').Router();
const thoughtsRoutes = require('./Thoughts');
const UserRoutes = require('./User');

router.use('/thoughts', thoughtsRoutes);
router.use('/User', UserRoutes);

module.exports = router;
