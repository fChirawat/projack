const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');

// ตั้งค่าเชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ใส่รหัสผ่าน MySQL ของคุณ
  database: 'project' // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

const app = express();

// ตั้งค่า middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  secret: 'your_secret_key', // เปลี่ยนเป็นคีย์ที่ปลอดภัย
  maxAge: 24 * 60 * 60 * 1000 // 24 ชั่วโมง
}));

// การลงทะเบียนผู้ใช้
app.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO register (username, password) VALUES (?, ?)'; // เปลี่ยนชื่อจาก users เป็น register
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// การเข้าสู่ระบบ
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM register WHERE username = ?'; // เปลี่ยนชื่อจาก users เป็น register
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          req.session.userId = user.id;
          return res.status(200).json({ message: 'Login successful' });
        } else {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      return res.status(400).json({ message: 'User not found' });
    }
  });
});

// การตรวจสอบการเข้าสู่ระบบ
app.get('/me', (req, res) => {
  if (req.session.userId) {
    const sql = 'SELECT * FROM register WHERE id = ?'; // เปลี่ยนชื่อจาก users เป็น register
    db.query(sql, [req.session.userId], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results[0]);
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// เสิร์ฟไฟล์ Vue
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
