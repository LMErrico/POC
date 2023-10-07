const router = require('express').Router();
const userRoutes = require('./userRoutes');
const menuRoutes = require('./menuRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/users', userRoutes);
router.use('/menu', menuRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;
