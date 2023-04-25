const express = require('express');
const lodgerController = require('../controllers/lodgerController');

const router = express.Router();

router.get('/', lodgerController.index);

module.exports = router;