const express = require('express');
const pgCRUD = require('../controllers/PG_CRUD');
const Authentication = require('../middlewares/authentication')
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/create', Authentication.landlord_Authentication, pgCRUD.create);

router.post('/delete/:id', Authentication.landlord_Authentication, pgCRUD.delete_pg);

router.post('/update/:id', Authentication.landlord_Authentication, pgCRUD.update_pg);

module.exports = router;