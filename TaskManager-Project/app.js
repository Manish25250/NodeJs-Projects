
const express = require("express");
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require("./db/connect.js");
require("dotenv").config();

//middleware

app.use(express.json());


//routes
//app.get('/hello', (req, res) => {res.send("Task Manager app")});
app.use('/api/v1/tasks', tasks)


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(3000,
      console.log("Server is running on port 3000")
    );
  } catch (err) {
    console.log(err);
  }
}

start();
