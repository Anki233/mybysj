var express = require('express');
var router = express.Router();

const UserController = require('../controllers/users')

router.get('/profile/:id', UserController.profile)
router.post('/updateprofile', UserController.updateprofile)
router.post('/modifypass',UserController.modifypass)

module.exports = router;
