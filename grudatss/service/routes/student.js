var express = require('express');
var router = express.Router();

const studentController = require('../controllers/student')

router.put('/topsele', studentController.topsele)

module.exports = router;
