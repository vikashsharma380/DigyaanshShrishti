import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";



const upload = multer({
  storage: multerS3({
    s3,
   bucket: "digyaansh-bsdm-images",

    acl: "public-read",
    key(req, file, cb) {
    key(req, file, cb) {
      cb(null, `bsdm/${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
