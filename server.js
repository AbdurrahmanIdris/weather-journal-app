// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, ()=> {console.log("Server Running!"); console.log(`Running on localhost: ${port}`)});

//Initialize all route with a callback function
app.get('/all', (req, res) => {
  res.send(projectData);
  projectData = {};
});

// POST route
//Initialize add route with a callback functione
app.post('/add', (req, res) => {
  projectData = {
    date: req.body.date,
    content: req.body.content,
    temp: req.body.temperature,
  }
  console.log(projectData);
});