const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const bcrypt = require('bcrypt');
const app = express();
const port = 5001;

app.use(cors({origin:['https://manikandan05.vercel.app','http://localhost:5173']}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
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

const testimonialSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String
});
const Testimonial = mongoose.model('Testimonials', testimonialSchema);

const timelineSchema = new mongoose.Schema({
  year: String,
  title: String,
  company: String,
  description: String,
  skills: [String],
  type: { type: String, enum: ['work', 'education'], default: 'work' },
  createdAt: { type: Date, default: Date.now }
});
const Timeline = mongoose.model('Timeline', timelineSchema);


const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  githubLink: String,
  imageUrl: String,
  deployment: String,
  techStack: [String], // Array of technologies used
  createdAt: { type: Date, default: Date.now }
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log(password, admin);
    

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/upload', async (req, res) => {
  try {
    const { title, description, githubLink, imageUrl, deployment, techStack } = req.body;
    const project = new Project({
      title,
      description,
      githubLink,
      imageUrl,
      deployment,
      techStack: techStack || []
    });

    await project.save();
    res.status(201).json({ message: 'Project uploaded successfully.', project });
  } catch (error) {
    console.error('Error uploading project:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error.' });
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

app.post('/api/uploadtestimonials', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const testimonial = new Testimonial({
      title,
      description,
      imageUrl,
    });
    await testimonial.save();
    res.status(201).send('Testimonial uploaded successfully.');
  } catch (error) {
    console.error('Error uploading testimonial:', error);
    res.status(500).send('Internal server error.');
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonial = await Testimonial.find();
    res.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).send('Internal server testimonials.');
  }
});

// Timeline CRUD operations
app.post('/api/timeline', async (req, res) => {
  try {
    const { year, title, company, description, skills, type } = req.body;
    const timeline = new Timeline({
      year,
      title,
      company,
      description,
      skills: skills || [],
      type: type || 'work'
    });
    await timeline.save();
    res.status(201).json({ message: 'Timeline entry created successfully.', timeline });
  } catch (error) {
    console.error('Error creating timeline entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/api/timeline', async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ year: -1 }); // Sort by year descending
    res.json(timeline);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.put('/api/timeline/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, company, description, skills, type } = req.body;
    
    const updatedTimeline = await Timeline.findByIdAndUpdate(
      id,
      { year, title, company, description, skills, type },
      { new: true, runValidators: true }
    );
    
    if (!updatedTimeline) {
      return res.status(404).json({ message: 'Timeline entry not found.' });
    }
    
    res.json({ message: 'Timeline entry updated successfully.', timeline: updatedTimeline });
  } catch (error) {
    console.error('Error updating timeline entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.delete('/api/timeline/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTimeline = await Timeline.findByIdAndDelete(id);
    
    if (!deletedTimeline) {
      return res.status(404).json({ message: 'Timeline entry not found.' });
    }
    
    res.json({ message: 'Timeline entry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting timeline entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
