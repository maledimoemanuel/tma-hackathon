const mongoose = require('mongoose');


const uploadSchema = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}

const Upload = mongoose.model('Upload', uploadSchema);