const express = require('express');
const fs = require('fs'); //fs means filesystem
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = 3000;

//Opens a "pool" where the database conneciton is stored
const pool = new Pool({
    user: "speeddemon_user", //from render
    host: "dpg-csr1hqjgbbvc73aug230-a", //from render
    password: "jzLaCQzC4jo56XHhFEF5xIR9xEoSATXI", //from render
    database: "speeddemon",
    port: 5432
});

//gives a path where the it can read a Query from
const getActivityInfoQuery = fs.readFileSync (
    path.join(__dirname, '../database/Queries', 'ActivityData.sql'),
    'utf-8'
);

//Established a temporary HTTPS where the pool can post data to.
//req, if needed, is used to get a request from the server
//res, if needed, is used to send a response to the server
app.get('/database/activityInfo', async (req, res) => {
    try{
        const result = await pool.query(getActivityInfoQuery);
        console.log(result); //Test Feature
        res.join(result.rows);
    }
    catch (error) {
        console.error('Error Executing Query:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`);
});