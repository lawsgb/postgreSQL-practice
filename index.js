const express = require('express');
const app = express();
const port = 8080;

app.use(express.json())

const students = [
    {
        id: '1',
        firstName: 'joe',
        lastName: 'smith'
    },
    {
        id: '2',
        firstName: 'jane',
        lastName: 'smith'
    },
    {
        id: '3',
        firstName: 'bob',
        lastName: 'smith'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

// return all students
app.get('/students', (req, res) => {
    res.send(students);
});

// return details of a specific student by student id
app.get('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const student = students.find(student => student.id === studentId);

    res.json(student);
});

app.listen(port)

module.exports = app