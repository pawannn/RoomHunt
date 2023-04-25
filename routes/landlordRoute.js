const express = require('express')
const landlordController = require('../controllers/landlordController')

const router = express.Router();

router.get('/', landlordController.index);

module.exports = router;