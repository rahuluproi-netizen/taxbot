const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  caId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  businessType: { type: String },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Pending'], 
    default: 'Active' 
  },
  queryHistory: [{
    query: String,
    answer: String,
    date: { type: Date, default: Date.now }
  }],
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', clientSchema);
