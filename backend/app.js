/* MongoDB */
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017')
};

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})

const User = mongoose.model('User', userSchema)
/**/

const connectionMySQL = require("./connectionMySQL");

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static("public"));

const userRoutes = require("./routes/userRoutes");
const imagesRoutes = require("./routes/imagesRoutes");
const servicehistoryRoutes = require("./routes/servicehistoryRoutes");
const ownershipsRoutes = require("./routes/ownershipsRoutes");
const carsRoutes = require("./routes/carsRoutes");

app.get('/api/registerUser', async (req, res) => {
  const findUser = await User.find({ username: req.query.data.split(' ')[0] })

  if (findUser.length <= 0) {
    const user = new User({ username: req.query.data.split(' ')[0], password: req.query.data.split(' ')[1] })
    user.save()
    res.send({ data: "success" })
  } else {
    res.send({ data: "nameInUse" })
  }
})

app.get('/api/loginUser', async (req, res) => {
  const findUser = await User.find({ username: req.query.data.split(' ')[0] })

  if (findUser.length >= 1) {
    if (findUser[0].password && findUser[0].password == req.query.data.split(' ')[1]) {
      res.send({ data: "success" })
    } else {
      res.send({ data: "Incorrect Password" })
    }
  } else {
    res.send({ data: "Unknown User" })
  }
})
// Use routes in express app
app.use(userRoutes);
app.use(imagesRoutes);
app.use(servicehistoryRoutes);
app.use(ownershipsRoutes);
app.use(carsRoutes);

// Start express webb
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
