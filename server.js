// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Middleware
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to the debug
function listening() {
    console.log("Server is running");
    console.log(`running on http://localhost:${port}`);
}

// GET route that returns the projectData object
app.get("/all", (request, response) => {
    response.send(projectData);
});

// POST route that adds incoming data to projectData
app.post("/addData", (request, response) => {
    projectData = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content,
    };
    console.log(projectData);
});
