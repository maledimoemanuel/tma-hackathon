const express = require('express');

const multer = require('multer');
const upload = multer( { dest: 'uploads/'} )

const Upload = require('../server/models/Upload');

const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const router = express.Router();
//const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

const mongoURI = 'mongodb+srv://maledimoemanuel:u6tfQEomJFapTVF0@cluster0.rfpq5zj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => { 
  console.error('MongoDB connection error:', err);
});

app.post('/api/uploads', uploadStorage.single('file'), async (req, res) => {
  try {
    const name = req.body?.name || 'Anonymous';
    const description = req.body?.description || '';
    const file = req.file;

    //if (!file) {
      //return res.status(400).json({ error: 'No file uploaded' });
    //}

    const newUpload = new Upload({
      name: name || 'Anonymous',
      description,
      fileUrl: `uploads/${file.originalname}`, 
      fileType: file.mimetype
    });
    
    await newUpload.save();
    res.status(201).json(newUpload);
  } catch (err) {
    console.error('Error saving upload:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/uploads', async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
