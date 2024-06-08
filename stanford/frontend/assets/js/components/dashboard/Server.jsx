const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; // Adjust the port number to your preference

app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',  // Host name
    user: 'root',       // MySQL username
    password: 'PNKumar41942',  // MySQL password
    database: 'Emerge_Learning',  // Name of the database you want to connect to
    port: 3306  // Default MySQL port
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

// API endpoint to get questions
app.get('/questions', (req, res) => { // Changed the endpoint to '/questions' for consistency
    const query = 'SELECT * FROM questions';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});