const express = require('express');
const lodgerController = require('../controllers/lodgerController');

const router = express.Router();

router.get('/', lodgerController.index_get);

router.post('/', lodgerController.index_post);

module.exports = router;