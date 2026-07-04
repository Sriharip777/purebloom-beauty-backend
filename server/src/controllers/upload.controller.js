const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
  if (allowed.test(path.extname(file.originalname))) return cb(null, true);
  cb(new Error('Only image files (jpg, jpeg, png, webp, gif, svg) are allowed'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } });

exports.uploadImage = (req, res) => {
  try {
    upload.single('image')(req, res, (err) => {
      if (err) return res.status(400).json({ success: false, message: err.message });
      if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });
      const url = `/uploads/${req.file.filename}`;
      res.json({ success: true, url });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadMultiple = (req, res) => {
  try {
    upload.array('images', 10)(req, res, (err) => {
      if (err) return res.status(400).json({ success: false, message: err.message });
      if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, message: 'No images uploaded' });
      const urls = req.files.map((f) => `/uploads/${f.filename}`);
      res.json({ success: true, urls });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
