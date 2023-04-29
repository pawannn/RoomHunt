const express = require('express');
const lodgerController = require('../controllers/lodgerController');

const router = express.Router();

router.get('/', lodgerController.index_get);

router.post('/', lodgerController.index_post);

router.get('/pg/:id', lodgerController.pg_get);

router.post('/pg/:id/requestroom', lodgerController.roomrequest);

module.exports = router;