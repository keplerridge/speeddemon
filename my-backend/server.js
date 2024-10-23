const express = require('express');
const { Client } = require('pg');

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

app.get('/api/activity', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM ActivityCard.activity');
        res.json(result.rows);  // Send the rows as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});