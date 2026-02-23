const mongoose = require('mongoose');

const savedProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  savedProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  note: {
    type: String,
    maxlength: 200,
  },
}, {
  timestamps: true,
});

// Ensure a user can't save the same profile twice
savedProfileSchema.index({ user: 1, savedProfile: 1 }, { unique: true });

module.exports = mongoose.model('SavedProfile', savedProfileSchema);
