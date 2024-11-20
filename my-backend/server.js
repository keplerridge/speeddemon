const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser'); // For parsing JSON payloads
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "rootUser",
    database: "SpeedDemon",
    port: 5432
});

client.connect();

// Middleware to parse JSON payloads
app.use(bodyParser.json());

// Existing route to fetch activity data
app.get('/api/activity', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM ActivityCard.activity');
        res.json(result.rows); // Send the rows as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// New route to register a user
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into `users` table
        const userResult = await client.query(
            'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING user_id',
            [username, email]
        );

        const userId = userResult.rows[0].user_id;

        // Insert password into `passwords` table
        await client.query(
            'INSERT INTO passwords (user_id, user_pass) VALUES ($1, $2)',
            [userId, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);

        if (error.code === '23505') {
            // Unique constraint violation for username or email
            res.status(400).json({ message: 'Username or email already exists.' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
