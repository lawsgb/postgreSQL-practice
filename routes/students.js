// const app = require.Router()

// const students = [
//     {
//         id: 1,
//         firstName: 'joe',
//         lastName: 'smith'
//     },
//     {
//         id: 2,
//         firstName: 'jane',
//         lastName: 'smith'
//     },
//     {
//         id: 3,
//         firstName: 'bob',
//         lastName: 'smith'
//     }
// ]

// router.get('/students', (req, res) => {
//     res.send(students);
// });

// // return details of a specific student by student id
// router.get('/students/:studentId', (req, res) => {
//     const studentId = req.params.studentId;
//     const student = students.find(student => student.id === studentId);

//     res.json(student);
// });

// module.exports = router