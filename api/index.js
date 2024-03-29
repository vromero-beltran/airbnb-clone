const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const cookieParcer = require("cookie-parser");
require("dotenv").config();
const app = express();
const bcryptSaltRounds = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParcer());


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173/",
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/test", (req, res) => {
  res.send("test ok");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSaltRounds),
    });
    res.json(user);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
      jwt.sign({ 
        email: user.email, 
        id: user._id, 
        name: user.name 
      },
          jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(user);
      });
    } else {
      res.status(422).json('Incorrect password');
    }
  } else {
    res.json('User not found');
  }
});

app.get('/profile', async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.get('/logout', (req, res) => {
  res.cookie('token', '').json(true);
})

app.listen(4000);