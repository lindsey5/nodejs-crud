const studentService = require('../services/studentService');
const Student = require('../models/student');

async function student_findAll(req, res) {
    try {
      const students = await studentService.getAllStudents();
      res.json(students);
    } catch (err) {
      console.error("Error fetching students");
    }
}

const student_create = async function (req, res) {
    const student = req.body;

    studentService.createStudent(student)
    .then(result => {
      if(result){
        res.json({ redirect:'/students'});
      }else{
        res.status(404).json({ error: 'Student Id already exist' });
      }
    })
    .catch(err =>{
        console.log("Error creating student");
    })
}

async function student_update (req, res) {
    const student_id = req.params.id;
    const updatedData = req.body;

    studentService.updateStudent(student_id, updatedData)
    .then(result =>{
      res.json({ redirect:'/students'});
    })
    .catch(err => {
      console.log("Error updating student");
    });
}

async function student_delete (req, res) {
    try {
      const student = await studentService.deleteStudent(req.params.id);
      if (student) {
        res.json({ redirect:'/students' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (err) {
        console.error("Error deleting student");
    }
  }

  module.exports = {
    student_findAll,
    student_create,
    student_update,
    student_delete
  }