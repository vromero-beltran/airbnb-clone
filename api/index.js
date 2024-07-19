const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require('./models/Places.js');
const cookieParcer = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();
const bcryptSaltRounds = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParcer());
app.use("/uploads", express.static(__dirname + "/uploads"));

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

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + ".jpg";
  await imageDownloader.image ({
    url: link,
    dest: __dirname + "/uploads" + newName,
  });
  res.json(newName);
})

const storage = multer({dest:'uploads'})
app.post('/upload', storage.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalName} = req.files[i];
    const parts = originalName.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
  const token = req.cookies.token;
  const {
    title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests, price,
    });
    res.json(placeDoc);
  });
});

app.get('/user-places', (res, res) => {
  const token = req.cookies.token;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}) );
  });
});

app.get('/places/:id', async (req, res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
});

app.put('/places/:id', async (req,res) => {
  const token = req.cookies.token;
  const {
    id, title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc =await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:addedPhotos,description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});

app.get('/places', async (req,res) => {
  res.json( await Place.find() );
})


app.listen(4000);