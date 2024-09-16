const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
    {
      id: 1,
      username: 'octocat',
      name: 'The Octocat',
      repoCount: 8,
      location: 'San Francisco',
    },
    {
      id: 2,
      username: 'torvalds',
      name: 'Linus Torvalds',
      repoCount: 25,
      location: 'Portland',
    },
    {
      id: 3,
      username: 'gaearon',
      name: 'Dan Abramov',
      repoCount: 50,
      location: 'London',
    },
    {
      id: 4,
      username: 'addyosmani',
      name: 'Addy Osmani',
      repoCount: 42,
      location: 'Mountain View',
    },
    {
      id: 5,
      username: 'tj',
      name: 'TJ Holowaychuk',
      repoCount: 150,
      location: 'Victoria',
    },
  ];

// Exercise 2: Get all users
// Create an endpoint /users that’ll fetch all the user data
// Send the data in response to the client
  app.get('/users', (req, res) => {
    res.json({ users });
  });

// Exercise 3: Get user by ID
// Create an endpoint /users/:id
// Fetch the user data based on the id
// Send the user data in response to the client
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) =>  user.id === id);

    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ message: "User not found"});
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("Server is running on the port number is: ", port);
})