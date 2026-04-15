const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
  },
  caId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subject: { type: String, required: true },
  description: { type: String },
  suggestedAIResponse: { type: String },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Urgent'], 
    default: 'Medium' 
  },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'], 
    default: 'Open' 
  },
  category: { 
    type: String, 
    enum: ['GST', 'ITR', 'TDS', 'Compliance', 'Audit', 'Other'], 
    default: 'Other' 
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
});

module.exports = mongoose.model('Ticket', ticketSchema);
