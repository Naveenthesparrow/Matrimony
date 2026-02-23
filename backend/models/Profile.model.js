const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // User reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  // Basic Information
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
  },
  physicalStatus: {
    type: String,
    enum: ['Normal', 'Physically Challenged'],
    default: 'Normal',
  },

  // Religious & Cultural
  religion: {
    type: String,
    trim: true,
  },
  caste: {
    type: String,
    trim: true,
  },
  subCaste: {
    type: String,
    trim: true,
  },
  gothram: {
    type: String,
    trim: true,
  },
  motherTongue: {
    type: String,
    trim: true,
  },
  languagesKnown: [String],

  // Birth Details
  timeOfBirth: {
    type: String,
  },
  placeOfBirth: {
    type: String,
  },

  // Physical Attributes
  complexion: {
    type: String,
    enum: ['Fair', 'Very Fair', 'Wheatish', 'Dark'],
  },
  bodyType: {
    type: String,
    enum: ['Slim', 'Average', 'Athletic', 'Heavy'],
  },

  // Profile Photo
  profilePhoto: {
    type: String,
    default: '',
  },
  photos: [{
    url: String,
    publicId: String,
  }],

  // Contact Information
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },

  // Location
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  residencyStatus: {
    type: String,
    enum: ['Citizen', 'Permanent Resident', 'Work Permit', 'Student Visa', 'Temporary Visa'],
  },

  // Education & Profession
  highestEducation: {
    type: String,
    required: true,
  },
  educationDetails: {
    type: String,
  },
  occupation: {
    type: String,
    required: true,
  },
  employedIn: {
    type: String,
    enum: ['Government', 'Private', 'Business', 'Self Employed', 'Not Working'],
  },
  annualIncome: {
    type: String,
  },

  // Family Details
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  brothers: {
    type: Number,
    default: 0,
  },
  brothersMarried: {
    type: Number,
    default: 0,
  },
  sisters: {
    type: Number,
    default: 0,
  },
  sistersMarried: {
    type: Number,
    default: 0,
  },
  familyType: {
    type: String,
    enum: ['Joint Family', 'Nuclear Family'],
  },
  familyValues: {
    type: String,
    enum: ['Traditional', 'Moderate', 'Liberal'],
  },
  familyStatus: {
    type: String,
    enum: ['Middle Class', 'Upper Middle Class', 'Rich', 'Affluent'],
  },

  // Horoscope (Optional)
  star: {
    type: String,
  },
  rasi: {
    type: String,
  },
  horoscopeMatch: {
    type: Boolean,
    default: false,
  },

  // Lifestyle & Interests
  diet: {
    type: String,
    enum: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian'],
  },
  smoking: {
    type: String,
    enum: ['No', 'Yes', 'Occasionally'],
  },
  drinking: {
    type: String,
    enum: ['No', 'Yes', 'Occasionally'],
  },
  hobbies: {
    type: String,
    maxlength: 200,
  },
  interests: {
    type: String,
    maxlength: 200,
  },

  // About
  aboutMe: {
    type: String,
    maxlength: 500,
  },

  // Partner Preferences
  partnerPreferences: {
    minAge: Number,
    maxAge: Number,
    minHeight: String,
    maxHeight: String,
    maritalStatus: [String],
    education: [String],
    occupation: [String],
    country: [String],
    state: [String],
    annualIncome: String,
    religion: [String],
    caste: [String],
    motherTongue: [String],
    diet: [String],
    description: String,
  },

  // Profile Completion
  profileCompleteness: {
    type: Number,
    default: 0,
  },

  // Privacy Settings
  privacySettings: {
    showPhone: {
      type: Boolean,
      default: false,
    },
    showEmail: {
      type: Boolean,
      default: false,
    },
    showPhotos: {
      type: Boolean,
      default: true,
    },
    showHoroscope: {
      type: Boolean,
      default: true,
    },
  },

  // Profile Stats
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },


}, {
  timestamps: true,
});

// Calculate profile completeness
profileSchema.methods.calculateCompleteness = function () {
  let completeness = 0;
  const fields = [
    'fullName', 'gender', 'dateOfBirth', 'height', 'maritalStatus',
    'profilePhoto', 'country', 'state', 'city', 'highestEducation',
    'occupation', 'fatherName', 'motherName', 'aboutMe',
    'religion', 'caste', 'motherTongue'
  ];

  fields.forEach(field => {
    if (this[field]) {
      completeness += 100 / fields.length;
    }
  });

  this.profileCompleteness = Math.round(completeness);
  return this.profileCompleteness;
};

// Index for searching
profileSchema.index({ fullName: 'text', city: 'text', occupation: 'text' });
profileSchema.index({ gender: 1, age: 1, maritalStatus: 1 });

module.exports = mongoose.model('Profile', profileSchema);
