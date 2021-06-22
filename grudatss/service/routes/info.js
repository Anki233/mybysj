var express = require('express');
var router = express.Router();

const InfoController = require('../controllers/info')

router.post('/getseletsub',InfoController.getseletsub)
router.post('/getsub',InfoController.getsub)
router.get('/searchinfo/:id',InfoController.searchinfo)

module.exports = router;
