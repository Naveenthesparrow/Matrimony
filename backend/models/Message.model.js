const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // Conversation participants
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
  
  // Message content
  content: {
    type: String,
    required: true,
    trim: true,
  },
  
  // Message type
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text',
  },
  
  // File attachment (if type is image or file)
  attachment: {
    url: String,
    publicId: String,
    filename: String,
  },
  
  // Read status
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: {
    type: Date,
  },
  
  // Conversation ID (for grouping messages)
  conversationId: {
    type: String,
    required: true,
    index: true,
  },
  
}, {
  timestamps: true,
});

// Static method to generate conversation ID
messageSchema.statics.generateConversationId = function(userId1, userId2) {
  return [userId1, userId2].sort().join('_');
};

// Index for efficient queries
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ conversationId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
