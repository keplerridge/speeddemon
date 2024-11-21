const express = require('express');
const fs = require('fs'); //fs means filesystem
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors(
    {origin: '*'}
));

//Opens a "pool" where the database conneciton is stored
const pool = new Pool({
    user: "speeddemon_user", //from render
    host: "dpg-csr1hqjgbbvc73aug230-a.oregon-postgres.render.com", //from render
    password: "jzLaCQzC4jo56XHhFEF5xIR9xEoSATXI", //from render
    database: "speeddemon",
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

//Handels CORS request which deals with using two different ports
    // (3000 for the front end stuff, but 5173 for 'dev' location)


//gives a path where the it can read a Query from
const getActivityInfoQuery = fs.readFileSync (
    path.join(__dirname, '../database/Queries', 'ActivityData.sql'),
    'utf-8'
);

const loadSQLQuery = (queryName) => {
    try{
        return fs.readFileSync(path.join(__dirname, '../database/Queries', `${queryName}.sql`),
        'utf-8'
        );
    } catch (error) {
        console.error('Error reading query file: ${queryName}.sql', error);
        throw error;
    }
}

//Established a temporary HTTPS where the pool can post data to.
//req, if needed, is used to get a request from the server
//res, if needed, is used to send a response to the server
app.get('/database/query', async (req, res) => {
    
    const queryNameRequestFromServer = req.query.queryName;
   
    //If this message displays, req did not get queryname from server
    if (!queryNameRequestFromServer){
        return res.status(400).send('Query name is required');
    }

    try{
        const query = loadSQLQuery(queryNameRequestFromServer);
        const result = await pool.query(query);
        console.log(result); //Test Feature
        res.json(result.rows);
    }

    //If this message displays, actual problem with query, but it was successfully accessed
    catch (error) {
        console.error('Error Executing Query:', error);
        res.status(500).send('Server Error');
    }
});


//SAMPLE FORMAT FOR HOW TO MAKE A CUSTOM ROUTE FOR A QUERY!
//See example above

/*app.get('/database/[INSERT QUERY FILE NAME HERE W/O .sql]', async (req, res) => {
    try{
        const result = await pool.query('[INSERT NAME YOU WANT THIS TO BE REFERENCED AS]');
        console.log(result); //Test Feature
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error Executing Query:', error);
        res.status(500).send('Server Error');
    }
});*/


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});