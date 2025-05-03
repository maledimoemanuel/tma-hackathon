const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const mongoURI = 'mongodb+srv://maledimoemanuel:u6tfQEomJFapTVF0@cluster0.rfpq5zj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => { 
  console.error('MongoDB connection error:', err);
});

// Upload Model
const uploadSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  description: String,
  fileUrl: String,
  fileType: String,
  createdAt: { type: Date, default: Date.now }
});

const Upload = mongoose.model('Upload', uploadSchema);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'), false);
    }
  }
});

// Routes
app.post('/api/uploads', upload.single('file'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newUpload = new Upload({
      name: name || 'Anonymous',
      description: description || '',
      fileUrl: `/uploads/${file.filename}`,
      fileType: file.mimetype
    });
    
    await newUpload.save();
    res.status(201).json(newUpload);
  } catch (err) {
    console.error('Error saving upload:', err);
    res.status(500).json({ error: err.message || 'Upload failed' });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
