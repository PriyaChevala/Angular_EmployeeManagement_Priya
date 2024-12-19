const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "priya";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const users = [
  { username: "user1", password: "password123" }, // Example user data
];

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "29Priya@16", // Replace with your MySQL password
  database: "employee_db",
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});
// Define change-password route
app.put("/api/change-password", async (req, res) => {
  console.log("Received request to change password:", req.body);
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res
      .status(400)
      .send("Username, old password, and new password are required");
  }

  // Query the database for the user
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error accessing the database");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = results[0];

    // Compare old password with the stored password (hashed)
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).send("Old password is incorrect");
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const updateQuery = "UPDATE users SET password = ? WHERE username = ?";
    db.query(updateQuery, [hashedNewPassword, username], (err, result) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).send("Error updating password");
      }
      res.status(200).send("Password updated successfully");
    });
  });
});

// app.post('/api/register', async (req, res) => {
//   const { email, username, password } = req.body;

//   try {
//     // Check if all required fields are provided
//     if (!email || !username || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Log hashed password (or save to DB instead)
//     console.log('Hashed password:', hashedPassword);

//     // Simulate saving the user data (You would insert this into your database)
//     console.log(`User registered: ${email}, ${username}`);

//     // Simulate a successful registration
//     const result = {
//       message: "Registration successful!",
//       status: "success",
//     };

//     // Send response as JSON
//     res.status(201).json(result);

//   } catch (error) {
//     console.error('Error hashing password:', error);
//     res.status(500).json({ message: 'Error hashing password' });
//   }
// });
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token." });
//     }

//     req.user = user; // Attach the decoded user info to the request
//     next();
//   });
// }

app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into the MySQL database
    const query =
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    db.query(query, [email, username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Error saving user to the database" });
      }

      console.log("User inserted:", result);
      res.status(201).json({
        message: "Registration successful!",
        status: "success",
        username: username,
        email: email,
      });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Error hashing password" });
  }
});

// app.post('/api/register', (req, res) => {
//   const { email, username, password } = req.body;
//   const result = {
//     message: "Registration successful!",
//     status: "success",
//   };

//   // Send a JSON response
//   res.status(201).json(result); // Send as JSON instead of plain text
// });
// bcrypt.hash(password, 10, (err, hashedPassword) => {
//   if (err) {
//     return res.status(500).send('Error hashing password');
//   }

//   const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
//   db.query(query, [email, username, hashedPassword], (err, result) => {
//     if (err) {
//       return res.status(500).send('Error registering user');
//     }
//     res.status(201).send('Registration successful!');
//   });
// });
// });

// CRUD Routes
app.get("/api/employees", (req, res) => {
  const query = "SELECT * FROM employees";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
// app.get('/api/employees/:id', (req, res) => {
//     const employeeId = req.params.id;
//     // Example of querying your database
//     db.query('SELECT * FROM employees WHERE id = ?', [employeeId], (err, result) => {
//       if (err) {
//         console.error('Error fetching employee data:', err);
//         return res.status(500).json({ message: 'Error fetching employee data' });
//       }
//       if (result.length === 0) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
//       res.json(result[0]); // Return the employee data
//     });
//   });

app.post("/api/employees", (req, res) => {
  const { first_name, last_name, email } = req.body;
  console.log("Request body:", req.body);

  // Validate input
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // SQL query to insert data
  const sql =
    "INSERT INTO employees (first_name, last_name, email) VALUES (?, ?, ?)";
  const values = [first_name, last_name, email];
  console.log("Request body:", req.body);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Failed to insert data into database." });
    }
    console.log("Data inserted:", result);
    res.status(201).json({ message: "Employee added successfully!" });
  });
});

app.put("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  const query =
    "UPDATE employees SET first_name = ?, last_name = ?, email = ? WHERE id = ?";
  db.query(query, [first_name, last_name, email, id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Employee updated successfully.");
    }
  });
});

app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM employees WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Employee deleted successfully.");
    }
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // res.status(200).json({ message: 'Login successful' ,username: user.username,
      //   token: 'your-jwt-token',});
      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      // Send the token to the client
      res.status(200).json({ token, username: user.username });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   console.log('Received credentials:', username, password);

//   const user = users.find(user => user.username === username && user.password === password);
//   if (!user) {
//     return res.status(401).json({ success: false, message: 'Invalid username or password' });
//   }

//   bcrypt.compare(password, user.password, (err, result) => {
//     if (err || !result) {
//       return res.status(401).json({ message: 'Invalid username or password123' });
//     }
//     bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
//       if (err) throw err;
//       if (isMatch) {
//           // Generate JWT and return response
//       } else {
//           return res.status(401).json({ message: 'Invalid username or password345' });
//       }
//   });

//     const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '100h' });
//     res.json({ success: true, username: user.username, email: user.email });
//   });
// });
// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;

//   // Fetch user from the database (using your method)
//   User.findOne({ username: username }, (err, user) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (!user) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     // Compare password with the hashed password
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal server error" });
//       }

//       if (isMatch) {
//         // Generate JWT token and send it back
//         const token = generateJWT(user); // Your token generation logic
//         return res.json({ token });
//       } else {
//         return res
//           .status(401)
//           .json({ message: "Invalid username or password" });
//       }
//     });
//   });
// });
// app.get('/api/user/profile', authenticateToken, (req, res) => {
//   const query = "SELECT username, email FROM users WHERE username = ?";
//   db.query(query, [req.user.username], (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const user = results[0];
//     res.json({
//       username: user.username,
//       email: user.email,
//     });
//   });
// });
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user; // Attach the user information to the request
//     next();
//   });
// };

// app.get('/api/user/profile', authenticateToken, (req, res) => {
//   const username = req.user.username;

//   const query = 'SELECT username, email FROM users WHERE username = ?';
//   db.query(query, [username], (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const user = results[0];
//     res.status(200).json(user);
//   });
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
