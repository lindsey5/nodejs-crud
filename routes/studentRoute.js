const express = require('express');
const studentController = require('../controller/studentController');

const router = express.Router();

router.get('/', studentController.student_findAll);
router.post('/', studentController.student_create);
router.put('/:id', studentController.student_update);
router.delete('/:id', studentController.student_delete);

module.exports = router;