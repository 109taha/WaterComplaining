const path = require("path");
const multer = require("multer");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB (in bytes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/avif" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "audio/mpeg3" ||
    file.mimetype === "audio/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only mp4, png, jpg, jpeg, avif, jfif, webp are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
module.exports = upload;
