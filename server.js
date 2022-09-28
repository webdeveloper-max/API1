const express = require('express')
const bodyParser= require('body-parser')
const usersRoutes= require('./routes/users.js');
const sqlite = require('sqlite3').verbose()
const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use('/users', usersRoutes)
app.get('/',(req, res)=>res.send('Hello from homepage.'));



app.listen(PORT, () => 
  console.log(`Server Running on port: http://localhost:${PORT}`)
)
