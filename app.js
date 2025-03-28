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
