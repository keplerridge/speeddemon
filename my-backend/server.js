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

//Generalized SQL Query Loader Function that accepts param queryName which gets assignment in app.get().
    //Path is given to 'Queries' folder in the database fold, and then the function loads 'queryName.sql' 
    //Error handeling is provided
    //Result is stored in the constant loadSQLQuery
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
    //queryNameRequestFromServer gets name via a req(uest).query.queryName which gets query name from server
    //Server will know the query name as by how it is requested in the axios request in the file which the request is being made from
        //See  ActivityCard.vue @ line 23 for an example
    //Try block
        //loadSQLQuery is called passing in the queryNameRequestFromServer for the param queryName, giving the loadSQLQuery logic to find pathway to Query
            //Stored in const query
        //the pool hosts the query
            //stores in const result
        //Finaly, the result is given as a res(sponse) to the server in the form of a json
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

//Check for proper communication with ports.
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});