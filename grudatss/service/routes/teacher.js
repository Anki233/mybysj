var express = require('express');
var router = express.Router();

const TeacherController = require('../controllers/teacher')

router.post('/submitqus', TeacherController.submitqus)
router.put('/updatequs',TeacherController.updatequs)
router.delete('/deletequs/:id',TeacherController.deletequs)
router.put('/choosestu',TeacherController.choosestu)

module.exports = router;
