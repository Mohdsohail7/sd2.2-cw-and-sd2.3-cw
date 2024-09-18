require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./lib/sequelize");
const userModel = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database connected and synced");
}).catch((error) => {
  console.error("Unable to connect to database", error);  
});

// Exercise 2: Get all users
// Create an endpoint /users that’ll fetch all the user data
// Send the data in response to the client
  app.get('/users', async (req, res) => {
    try {
      const users = await userModel.findAll();
      res.json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to fetch all users"});
    }
  });

// Exercise 3: Get user by ID
// Create an endpoint /users/:id
// Fetch the user data based on the id
// Send the user data in response to the client
app.get('/users/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    
    try {
      const user = await userModel.findByPk(id);

      if (user) {
          res.json({ user });
      } else {
          res.status(404).json({ message: "User not found"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to fetch user by id"});
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on the port number is: ", port);
})