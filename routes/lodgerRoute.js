const express = require('express');
const lodgerController = require('../controllers/lodgerController');

const router = express.Router();

router.get('/', lodgerController.index_get);

router.post('/', lodgerController.index_post);

router.get('/pg/:id', lodgerController.pg_get);

router.get('/savedpgs', lodgerController.get_saved);

router.post('/pg/:id/requestroom', lodgerController.roomrequest);

router.post('/pg/:id/save', lodgerController.savepg);

router.post('/pg/:id/comment', lodgerController.comment);

module.exports = router;