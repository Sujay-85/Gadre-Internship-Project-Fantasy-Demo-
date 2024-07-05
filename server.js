const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Suj@y935974', // Replace with your MySQL password
  database: 'project'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
  const { name, email, number, username, password,rpassword } = req.body;
  const sql = 'INSERT INTO user_account (user_name, email,mobile_number, username, create_password,retype_password) VALUES (?,?,?,?,?,?)';
  db.query(sql, [name, email, number, username, password,rpassword], (err, result) => {
    if (err) {
      return res.status(500).send(`${err}`);
    }
    res.send('User details saved successfully');
  });
});

app.get('/view', (req, res) => {
  const sql = 'SELECT * FROM user_account';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching data from database');
    }
    res.send(`
      <html>
        <head>
          <title>View Users</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>User Details</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Username</th>
              <th>Password</th>

            </tr>
            ${results.map(user => `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                
                <td>${user.email}</td>
                <td>${user.number}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `);
  });
});


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  
  const sql = 'SELECT * FROM user_account WHERE username =? AND create_password =?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send(`${err}`);
    }
    if (results.length > 0) {
      res.redirect('/dashboard.html');
    } else {
      // console.log(res);
      res.send(`${err}`);
    }
  });
});

app.post('/newcontest', (req, res) => {
  const { contest_date, start_time, name, fees, price} = req.body;
  // console.log(req);
  const sql = 'INSERT INTO contest_list (contest_date, start_time, name, fees, price) VALUES (?,?,?,?,?)';
  db.query(sql, [contest_date, start_time, name, fees, price], (err, result) => {
    if (err) {
      console.error(err); // Log the error for debugging

      return res.status(500).send('Error saving to database');
    }else{
      res.redirect('/dashboard.html');
    }
  });
});

app.get('/data', (req, res) => {
  db.query('SELECT id,contest_date, start_time, name, fees, price FROM contest_list', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get('/data1', (req, res) => {
  db.query('SELECT id,contest_date, start_time, name, fees, price FROM contest_list', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/join', (req, res) => {
  const { id } = req.body;
  const query = `UPDATE contest_list SET status = 'Joined!' WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Joined contest with ID: ' + id });
  });
});


app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
