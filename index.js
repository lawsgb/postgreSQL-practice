const express = require('express');
const body_parser = require('body-parser');
const app = express();
const port = 8080;

app.use(express.json())
app.use(body_parser.json());

const students = [
    {
        studentId: 1,
        firstName: 'joe',
        lastName: 'smith',
        grades: [
            {
                Year: 2019,
                Semester: 'Spring',
                GPA: 3.5
            }, 
            {
                Year: 2019,
                Semester: 'Fall',
                GPA: 3.5
            }
        ]
    },
    {
        studentId: 2,
        firstName: 'jane',
        lastName: 'smith',
        grades: [
            {
                Year: 2019,
                Semester: 'Spring',
                GPA: 3.5
            }, 
            {
                Year: 2019,
                Semester: 'Fall',
                GPA: 3.5
            }
        ]
    },
    {
        studentId: 3,
        firstName: 'bob',
        lastName: 'smith',
        grades: [
            {
                Year: 2019,
                Semester: 'Spring',
                GPA: 3.5
            }, 
            {
                Year: 2019,
                Semester: 'Fall',
                GPA: 3.5
            }
        ]
    }
]

const users = [
    {
        userName: 'notARealUserName',
        email: 'notaRealEmailAddress@blah.com'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

// return a list of all students
app.get('/students', (req, res) => {
    let studentLastName = req.query.search;
    let result = students;

    if (studentLastName) {
        result = students.find(student => student.lastName === studentLastName)
    }

    res.send(result);
});

// return details of a specific student by student id
app.get('/students/:studentId', (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const student = students.find(student => student.studentId === studentId);

    res.json(student);
});

// returns all grades for a given student by student id
app.get('/students/:studentId/grades', (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const student = students.find(student => student.studentId === studentId);
    const grades = student.grades;

    res.json(grades);
});

// record a new grade
app.post('/grades', (req, res) => {
    const grade = req.body;
    if (!grade.studentId || typeof grade.grades == Array) {
        res.status(422).send(() => {
            return new Error('grade set must be associated with a student - please include a studentId in your request')
        })
    }

    res.status(201).json(grade)
})

// create a new user
app.post('/register', (req, res) => {
    const user = req.body;
    if (!user.userName || !user.email) {
        res.status(422).send(() => {
            return new Error('please specify BOTH the username and email for the user')
        })
    }

    res.status(201).json(user)
})

app.listen(port)

module.exports = app