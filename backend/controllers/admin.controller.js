const User = require('../models/User.model');
const Profile = require('../models/Profile.model');

// @desc    Get all users with pending profile approval (certificate uploaded but not verified)
// @route   GET /api/admin/profiles/pending
// @access  Private/Admin
exports.getPendingProfiles = async (req, res) => {
    try {
        const pendingUsers = await User.find({
            'communityCertificate.url': { $exists: true, $ne: null },
            'communityCertificate.verified': false
        }).select('-password').populate('profile');

        res.status(200).json({
            status: 'success',
            results: pendingUsers.length,
            data: {
                users: pendingUsers
            }
        });
    } catch (error) {
        console.error('Get pending profiles error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching pending profiles'
        });
    }
};

// @desc    Approve a user's certificate and profile
// @route   PUT /api/admin/profiles/:id/approve
// @access  Private/Admin
exports.approveProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        if (!user.communityCertificate || !user.communityCertificate.url) {
            return res.status(400).json({
                status: 'error',
                message: 'No certificate found for this user'
            });
        }

        user.communityCertificate.verified = true;
        user.communityCertificate.verifiedBy = req.user._id;
        user.isProfileApproved = true;

        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Profile approved successfully',
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Approve profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error approving profile'
        });
    }
};

// @desc    Reject a user's certificate
// @route   PUT /api/admin/profiles/:id/reject
// @access  Private/Admin
exports.rejectProfile = async (req, res) => {
    try {
        const { reason } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Reset certificate status
        user.communityCertificate.verified = false;
        user.isProfileApproved = false;

        // In a real app, you might want to delete the file from Cloudinary 
        // and notify the user with the reason.

        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Profile rejected successfully',
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Reject profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error rejecting profile'
        });
    }
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
exports.toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Don't allow blocking yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                status: 'error',
                message: 'You cannot block yourself'
            });
        }

        user.isBlocked = !user.isBlocked;
        user.isActive = !user.isBlocked; // Deactivate if blocked

        await user.save();

        res.status(200).json({
            status: 'success',
            message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Toggle block user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error toggling user block status'
        });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate('profile');

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching users'
        });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });

        const pendingApprovals = await User.countDocuments({
            'communityCertificate.url': { $exists: true, $ne: null },
            'communityCertificate.verified': false
        });

        // Active profiles: Approved AND Active AND Not Blocked
        const activeProfiles = await User.countDocuments({
            isProfileApproved: true,
            isActive: true,
            isBlocked: false
        });

        const blockedUsers = await User.countDocuments({
            isBlocked: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                stats: {
                    totalUsers,
                    pendingApprovals,
                    activeProfiles,
                    blockedUsers
                }
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching dashboard statistics'
        });
    }
};
