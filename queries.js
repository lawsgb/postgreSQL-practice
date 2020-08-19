const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'students',
  password: 'speakers',
  port: 5432,
})

// returns a list of all students - if search query was specified, returns a list of all students filtered by last name instead
const getAllStudents = (request, response) => {
    const studentLastName = request.query.search

    if (studentLastName) {
        pool.query('SELECT * FROM students WHERE lastName = $1', [studentLastName], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    else {
        pool.query('SELECT * FROM students ORDER BY studentId ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

// returns details of a specific student by student id
const getStudentByStudentId = (request, response) => {
    const studentId = parseInt(request.params.studentId)

    pool.query('SELECT * FROM students WHERE studentId = $1', [studentId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// returns all grades for a given student by student id
const getGradesByStudentId = (request, response) => {
    const studentId = parseInt(request.params.studentId)

    pool.query('SELECT * FROM grades WHERE studentId = $1', [studentId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// records a new grade, returns success status in JSON response and stores the new grade in the database
const insertGradeForStudent = (request, response) => {
    const studentId = parseInt(request.params.studentId)
    const { Year, Semester, GPA } = request.body

    pool.query('INSERT INTO grades (studentid, year, semester, gpa) VALUES ($1, $2, $3, $4)', [studentId, Year, Semester, GPA], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows)
    })
}

// creates a new user, returns success status in JSON response and stores the new user in the database
const registerUser = (request, response) => {
    const { UserName, Email } = request.body
    pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [UserName, Email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json(results.rows)
    })
}

module.exports = {getAllStudents, getStudentByStudentId, getGradesByStudentId, insertGradeForStudent, registerUser}