const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { AppError } = require('../middleware/validation.middleware');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration
const storage = multer.memoryStorage();

// File filter for images
const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed', 400), false);
  }
};

// File filter for certificates (images and PDFs)
const certificateFileFilter = (req, file, cb) => {
  // Accept images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Only image and PDF files are allowed', 400), false);
  }
};

// Multer upload configuration
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024, // 50MB
  },
});

// Certificate upload configuration (allows PDFs)
exports.certificateUpload = multer({
  storage: storage,
  fileFilter: certificateFileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024, // 50MB
  },
});

// Upload image to Cloudinary
exports.uploadToCloudinary = async (fileBuffer, folder = 'profiles') => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `dkv-matrimony/${folder}`,
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        }
      ).end(fileBuffer);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new AppError('Error uploading image', 500);
  }
};

// Upload certificate to Cloudinary (supports images and PDFs)
exports.uploadCertificateToCloudinary = async (fileBuffer, filename, folder = 'certificates') => {
  try {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: `dkv-matrimony/${folder}`,
        public_id: filename.replace(/\.[^/.]+$/, ''), // Remove file extension
        resource_type: 'auto', // Auto-detect resource type (image, pdf, etc.)
      };

      // Add transformations only for images
      if (filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
        uploadOptions.transformation = [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' },
        ];
      }

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              filename: filename,
            });
          }
        }
      ).end(fileBuffer);
    });
  } catch (error) {
    console.error('Certificate upload error:', error);
    if (error.http_code === 401) {
      console.error('Cloudinary Auth Failed. Check CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET in .env');
    }
    throw new AppError(`Error uploading certificate: ${error.message}`, 500);
  }
};

// Delete image from Cloudinary
exports.deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new AppError('Error deleting image', 500);
  }
};

// Upload multiple images
exports.uploadMultipleImages = async (files, folder = 'profiles') => {
  try {
    const uploadPromises = files.map(file =>
      this.uploadToCloudinary(file.buffer, folder)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new AppError('Error uploading images', 500);
  }
};
