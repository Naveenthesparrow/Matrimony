const mongoose = require('mongoose');

const profileViewSchema = new mongoose.Schema({
  viewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  viewedProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  viewCount: {
    type: Number,
    default: 1,
  },
  lastViewedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
profileViewSchema.index({ viewer: 1, viewedProfile: 1 }, { unique: true });

module.exports = mongoose.model('ProfileView', profileViewSchema);
