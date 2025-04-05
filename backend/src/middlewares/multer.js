import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const type = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + type);
    },
  }),
});

export default upload;
