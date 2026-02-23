const Profile = require('../models/Profile.model');
const User = require('../models/User.model');

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Private
exports.getProfiles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        let filter = {
            role: 'user',
            _id: { $ne: req.user._id }
        };

        // If user is admin, they can see all profiles
        // If regular user, they only see approved profiles of the opposite gender
        if (req.user.role !== 'admin') {
            filter.isProfileApproved = true;

            // Find current user's gender to filter by opposite gender
            const currentUserProfile = await Profile.findOne({ user: req.user._id });
            const oppositeGender = currentUserProfile && currentUserProfile.gender === 'Male' ? 'Female' : 'Male';

            if (oppositeGender) {
                // To filter by gender, we need to find users whose profile match gender
                // OR we can fetch more and filter in JS, but better to use aggregate if possible
                // For simplicity with current schema, we'll sub-query or populate match
            }
        }

        let query = User.find(filter)
            .select('fullName phone isProfileApproved communityCertificate role')
            .populate({
                path: 'profile',
                select: 'gender age height city state occupation highestEducation annualIncome profilePhoto'
            })
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);
        const users = await query.skip(skip).limit(limit);

        // Filter and format profiles
        const profiles = users
            .filter(u => u.profile) // Ensure profile exists
            .map(u => ({
                ...u.toObject(),
                // Add any virtuals or formatting if needed
            }));

        res.status(200).json({
            status: 'success',
            results: profiles.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: {
                profiles
            }
        });
    } catch (error) {
        console.error('Get profiles error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching profiles'
        });
    }
};

// @desc    Get profile by ID
// @route   GET /api/profiles/:id
// @access  Private
exports.getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -otp -otpExpiry')
            .populate('profile');

        if (!user || !user.profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        // Check if profile is approved (admins can see unapproved ones)
        if (req.user.role !== 'admin' && !user.isProfileApproved) {
            return res.status(403).json({
                status: 'error',
                message: 'This profile is pending approval'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Get profile by ID error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching profile'
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/profiles/me
// @access  Private
exports.getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password -otp -otpExpiry')
            .populate('profile');

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Get my profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching your profile'
        });
    }
};

// @desc    Create/Update current user profile
// @route   POST /api/profiles
// @access  Private
exports.upsertProfile = async (req, res) => {
    try {
        const profileData = {
            ...req.body,
            user: req.user._id,
            phone: req.user.phone,
            email: req.user.email,
            fullName: req.user.fullName || req.body.fullName
        };

        let profile = await Profile.findOne({ user: req.user._id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user._id },
                { $set: profileData },
                { new: true, runValidators: true }
            );
        } else {
            // Create
            profile = await Profile.create(profileData);

            // Update user with profile reference
            await User.findByIdAndUpdate(req.user._id, { profile: profile._id });
        }

        // Recalculate completeness
        profile.calculateCompleteness();
        await profile.save();

        res.status(200).json({
            status: 'success',
            data: {
                profile
            }
        });
    } catch (error) {
        console.error('Upsert profile error:', error);
        res.status(400).json({
            status: 'error',
            message: error.message || 'Error saving profile'
        });
    }
};
