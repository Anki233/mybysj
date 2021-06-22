var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/admin')

router.put('/updatesub', AdminController.updatesub)
router.delete('/delselsub/:id',AdminController.delselsub)

module.exports = router;
