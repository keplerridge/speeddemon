const express = require("express");
const fs = require("fs"); //fs means filesystem
const path = require("path");
const { Pool } = require("pg");
const cors = require("cors");
const env = require("dotenv").config();
const bcrypt = require("bcrypt"); // used for hashing password

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());

console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
});

//BEGIN RETRIEVING INFO
//////////////////////////////////////////////
//Opens a "pool" where the database conneciton is stored
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

//Handels CORS request which deals with using two different ports
// (3000 for the front end stuff, but 5173 for 'dev' location)

//gives a path where the it can read a Query from
const getActivityInfoQuery = fs.readFileSync(
  path.join(__dirname, "../database/Queries", "ActivityData.sql"),
  "utf-8"
);

//Generalized SQL Query Loader Function that accepts param queryName which gets assignment in app.get().
//Path is given to 'Queries' folder in the database fold, and then the function loads 'queryName.sql'
//Error handeling is provided
//Result is stored in the constant loadSQLQuery
const loadSQLQuery = (queryName) => {
  try {
    return fs.readFileSync(
      path.join(__dirname, "../database/Queries", `${queryName}.sql`),
      "utf-8"
    );
  } catch (error) {
    console.error("Error reading query file: ${queryName}.sql", error);
    throw error;
  }
};

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
app.get("/database/query", async (req, res) => {
  const queryNameRequestFromServer = req.query.queryName;

  //If this message displays, req did not get queryname from server
  if (!queryNameRequestFromServer) {
    return res.status(400).send("Query name is required");
  }

  try {
    const query = loadSQLQuery(queryNameRequestFromServer);
    const result = await pool.query(query);
    console.log(result); //Test Feature
    res.json(result.rows);
  } catch (error) {
    //If this message displays, actual problem with query, but it was successfully accessed
    console.error("Error Executing Query:", error);
    res.status(500).send("Server Error");
  }
});

//BEGIN SEDNING INFO
////////////////////////////////////////////

/*General Format is as follows:
    Creates a variable which will hold all the appropriate info
    Validation for existance of data being filled is checked
    Procedure is placed in a variable (query)
    the query is exectues with the given parameters
    errors are caught*/

// BEGIN INSERT NEW USER
app.post("/database/insertUser", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `CALL InsertNewUser($1, $2, $3);`;

    // Execute the query with the hashed password
    const result = await pool.query(query, [username, email, hashedPassword]);

    res.status(200).json("User inserted successfully");
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json("Server error");
  }
});

// BEGIN INSERT ACTIVITY LOG
app.post("/database/insertActivityLog", async (req, res) => {
  const {
    userName,
    startLat,
    startLong,
    endLat,
    endLong,
    timeElapsed,
    modeOfTransport,
  } = req.body;

  // Validate required fields
  if (
    !userName ||
    startLat === undefined ||
    startLong === undefined ||
    endLat === undefined ||
    endLong === undefined ||
    !timeElapsed ||
    !modeOfTransport
  ) {
    return res.status(400).send("All fields are required");
  }

  try {
    const query = `
            CALL InsertActivityLogData(
                $1, 
                MakeLatLangDataPoint($2, $3),
                MakeLatLangDataPoint($4, $5),
                $6, 
                $7
            );
        `;

    // Execute the query with parameters
    await pool.query(query, [
      userName,
      startLat,
      startLong,
      endLat,
      endLong,
      timeElapsed,
      modeOfTransport,
    ]);

    res.status(200).send("Activity log inserted successfully");
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Server error");
  }
});

app.get("/database/getAllUsers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM speeddemonschema.users");
    console.log(result); // Log the query result to see if it returns the data
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the actual error
    res.status(500).json("Server error");
  }
});

app.get("/database/getUser", async (req, res) => {
  try {
    // Extract the input (username or email) from the query parameters
    const input = req.query.input;

    if (!input) {
      return res.status(400).send({ message: "Input is required" });
    }

    // Perform the query directly to get user data based on the input
    const result = await pool.query(
      "SELECT user_id, username, email, password FROM speeddemonschema.users WHERE username = $1 OR email = $1",
      [input] // Pass the input parameter for dynamic querying
    );

    // Check if a user was found
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the first matching user as response
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the user." });
  }
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json("Username and password are required");
  }

  try {
    // Query the database for the user based on username or email
    const result = await pool.query(
      "SELECT user_id, username, email, password FROM speeddemonschema.users WHERE username = $1 OR email = $1",
      [username] // Use the username (or email) to query the database
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Compare the password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Password is correct, you can send a success response or generate a JWT token if needed
        res.status(200).json({
          message: "Login successful",
          userId: user.user_id,
          username: user.username,
        });
      } else {
        // Invalid password
        res.status(401).json("Invalid credentials");
      }
    } else {
      // User not found
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json("Server error");
  }
});

//Check for proper communication with ports.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
