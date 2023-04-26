const express = require('express');
const pgCRUD = require('../controllers/PG_CRUD');
const Authentication = require('../middlewares/authentication')
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/create', Authentication.landlord_Authentication, pgCRUD.create);

module.exports = router;