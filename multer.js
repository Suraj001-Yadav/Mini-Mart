const multer = require('multer');

// Use memory storage to store image as buffer in MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
