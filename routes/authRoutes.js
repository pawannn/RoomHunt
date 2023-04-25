const express = require('express');
const authControl = require('../controllers/authController');

const router = express.Router();

router.post('/landlordregister', authControl.landLord_register);
router.post('/landlordlogin', authControl.landLord_login);
router.post('/landlordlogout', authControl.landlord_logout);
router.post('/lodgerregister', authControl.lodger_register);
router.post('/lodgerlogin', authControl.lodger_login);
router.post('/lodgerlogout', authControl.lodger_logout);

module.exports = router;