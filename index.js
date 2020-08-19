const express = require('express')
const body_parser = require('body-parser')
const db = require('./queries')
const port = 8080;
const app = express()

app.use(express.json())
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }))

// const users = [
//     {
//         userName: 'notARealUserName',
//         email: 'notaRealEmailAddress@blah.com'
//     }
// ]

app.get('/', (req, res) => {
    res.send('Hello World');
});

// returns a list of all students - if search query is specified, returns a list of all students filtered by last name instead
app.get('/students', db.getAllStudents);

// returns details of a specific student by student id
app.get('/students/:studentId', db.getStudentByStudentId);

// returns all grades for a given student by student id
app.get('/grades/:studentId', db.getGradesByStudentId);

// records a new grade, returns success status in JSON response and stores the new grade in the database
app.post('/grades/:studentId', db.insertGradeForStudent);

//creates a new user, returns success status in JSON response and stores the new user in the database
app.post('/register', db.registerUser);

// // return details of a specific student by student id
// app.get('/students/:studentId', (req, res) => {
//     const studentId = parseInt(req.params.studentId);
//     const student = students.find(student => student.studentId === studentId);

//     res.json(student);
// });

// // returns all grades for a given student by student id
// app.get('/students/:studentId/grades', (req, res) => {
//     const studentId = parseInt(req.params.studentId);
//     const student = students.find(student => student.studentId === studentId);
//     const grades = student.grades;

//     res.json(grades);
// });

// // record a new grade
// app.post('/grades', (req, res) => {
//     const grade = req.body;
//     if (!grade.studentId || typeof grade.grades == Array) {
//         res.status(422).send(() => {
//             return new Error('grade set must be associated with a student - please include a studentId in your request')
//         })getStudents
//     res.status(201).json(grade)
// })

// // create a new user
// app.post('/register', (req, res) => {
//     const user = req.body;
//     if (!user.userName || !user.email) {
//         res.status(422).send(() => {
//             return new Error('please specify BOTH the username and email for the user')
//         })
//     }

//     res.status(201).json(user)
// })

app.listen(port)

module.exports = app