const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        role TEXT DEFAULT 'user'
    )`);
    
    db.run(`CREATE TABLE documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`INSERT INTO users (username, password, email, role) VALUES 
        ('admin', 'admin123', 'admin@example.com', 'admin'),
        ('user1', 'password', 'user1@example.com', 'user')`);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    db.get(query, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (row) {
            const token = Buffer.from(`${row.id}:${row.username}`).toString('base64');
            res.json({ 
                success: true, 
                token: token,
                user: row
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    
    const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
    
    db.run(query, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, userId: this.lastID });
    });
});

app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    
    db.get(`SELECT * FROM users WHERE id = ${userId}`, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

app.post('/api/documents', (req, res) => {
    const { userId, title, content } = req.body;
    
    const query = `INSERT INTO documents (user_id, title, content) VALUES (${userId}, '${title}', '${content}')`;
    
    db.run(query, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, documentId: this.lastID });
    });
});

app.get('/api/documents/:id', (req, res) => {
    const docId = req.params.id;
    
    db.get(`SELECT * FROM documents WHERE id = ${docId}`, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q;
    
    const query = `SELECT * FROM documents WHERE title LIKE '%${searchTerm}%' OR content LIKE '%${searchTerm}%'`;
    
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.delete('/api/documents/:id', (req, res) => {
    const docId = req.params.id;
    
    db.run(`DELETE FROM documents WHERE id = ${docId}`, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, changes: this.changes });
    });
});

app.post('/api/admin/execute', (req, res) => {
    const { query } = req.body;
    
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ results: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
