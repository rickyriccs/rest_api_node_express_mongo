const express = require('express');
const {connectToDb, getDb} = require('./db');
const port = process.env.PORT || 3001;
// initializing the app
const app = express();
// setup middleware
app.use(express.json());
// parse incoming json
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
        db = getDb();
    }
})

app.get('/api/students', (req, res) => {
    const page = parseInt(req.query.p) || 0;
    const studentsPerPage = 10;
    let students = [];
    db.collection('students').find()
        .sort({ id: 1 })
        .skip(studentsPerPage * page)
        .limit(studentsPerPage)
        .forEach(student => {
            students.push(student);
        })
        .then(() => {
            res.status(200).json(students);
        })
        .catch(() => {
            res.status(500).json({msg: 'Something went wrong.'});
        })
});

app.get('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    if(!isNaN(studentId)){
        db.collection('students')
            .findOne({ id: studentId })
            .then((student) => {
                res.status(200).json(student);
            })
            .catch(() => {
                res.status(500).json({msg: 'Something went wrong.'});
            })
    } else {
        res.status(404).json({msg: 'Not a valid id'})
    }
})