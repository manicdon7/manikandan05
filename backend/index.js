const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

app.use(cors({ origin: 'https://manikandan05.vercel.app' }));
app.use(bodyParser.json());
const dburi = process.env.dbURI;
mongoose.connect(dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});


const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String
});
const Certificate = mongoose.model('Certificate', certificateSchema);


const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  githubLink: String,
  imageUrl: String,
  deployment: String,
});
const Project = mongoose.model('Project', projectSchema);

const userSchema = new mongoose.Schema({
  admin: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.get("/", async (req, res) => {
  res.json({ message: "API's are working!" });
})

app.post('/api/register', async (req, res) => {
  const { admin, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      admin,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { admin, password } = req.body;

  try {
    const user = await User.findOne({ admin });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { title, description, githubLink, imageUrl, deployment } = req.body;
    const project = new Project({
      title,
      description,
      githubLink,
      imageUrl,
      deployment
    });

    await project.save();
    res.status(201).send('Project uploaded successfully.');
  } catch (error) {
    console.error('Error uploading project:', error);
    res.status(500).send('Internal server error.');
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Internal server error.');
  }
});

app.post('/api/uploadCertificate', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const certificate = new Certificate({
      title,
      description,
      imageUrl,
    });
    await certificate.save();
    res.status(201).send('Certificate uploaded successfully.');
  } catch (error) {
    console.error('Error uploading certificate:', error);
    res.status(500).send('Internal server error.');
  }
});

app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
