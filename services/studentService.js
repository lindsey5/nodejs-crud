const Student = require('../models/student');

// Create a new student
async function createStudent(studentData) {
    return await Student.findByPk(studentData.student_id) ? null : Student.create(studentData);
}

// Get all students
async function getAllStudents() {
    return Student.findAll();
}

/*
// Get a student by ID
async function getStudentById(studentID) {
    return Student.findByPk(studentID); // Correct method is `findByPk`
}*/

// Update a student by ID
async function updateStudent(studentID, updateData) {
    const student = await Student.findByPk(studentID); 
    if (student) {
        const updatedStudent = await student.update(updateData);
        return updatedStudent;
    }
    return null;
}

// Delete a student by ID
async function deleteStudent(studentID) {
    const student = await Student.findByPk(studentID); 
    if (student) {
        await student.destroy(); 
        return true;
    }
    return false;
}

module.exports = {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
};
