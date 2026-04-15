const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'CA', 'Staff', 'Client'], 
    default: 'Client' 
  },
  phone: { type: String },
  businessType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
