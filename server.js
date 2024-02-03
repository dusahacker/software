// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sadeek',
  password: '',
  database: 'complaint_system',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Complaint submission route
app.post('/submit_complaint', (req, res) => {
  const {
    first_name,
    last_name,
    email,
    category_name,
    description,
  } = req.body;

  // SQL query to insert a new complaint into the database
  const insertComplaintQuery = `
    INSERT INTO complaint(first_name, last_name, email, category_name, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    insertComplaintQuery,
    [first_name, last_name, email, category_name, description],
    (err, result) => {
      if (err) {
        console.error('Error submitting complaint:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Redirect the user back to the appropriate page after submission
        res.redirect('/admin.html');
      }
    }
  );
});

// Complaint response route
app.post('/submit_response', (req, res) => {
  const { complaintID, first_name, email, response_text } = req.body;

  // SQL query to update a complaint with a response
  const updateComplaintQuery = `
    UPDATE complaint
    SET staff.first_name = ?, staff.email = ?, response_text = ?, dateResponded = NOW()
    WHERE complaintID = ?
  `;

  db.query(
    updateComplaintQuery,
    [staff.first_nameame, staff.email, response_text, complaintID],
    (err, result) => {
      if (err) {
        console.error('Error submitting response:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Redirect the user back to the appropriate page after submission
        res.redirect('/admin.html');
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
