const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  // Sender and Receiver
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending',
  },
  
  // Message with interest
  message: {
    type: String,
    maxlength: 500,
  },
  
  // Viewed status
  isViewed: {
    type: Boolean,
    default: false,
  },
  viewedAt: {
    type: Date,
  },
  
  // Response
  responseMessage: {
    type: String,
    maxlength: 500,
  },
  respondedAt: {
    type: Date,
  },
  
}, {
  timestamps: true,
});

// Index for efficient queries
interestSchema.index({ sender: 1, receiver: 1 });
interestSchema.index({ receiver: 1, status: 1 });

module.exports = mongoose.model('Interest', interestSchema);
