const express = require('express')
const landlordController = require('../controllers/landlordController')

const router = express.Router();

router.get('/', landlordController.index);

router.get('/:id', landlordController.display_PG);

module.exports = router;