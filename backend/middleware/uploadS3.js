import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";

console.log("UPLOAD ENV CHECK:");
console.log("AWS_BUCKET_NAME =", process.env.AWS_BUCKET_NAME);
console.log("AWS_REGION =", process.env.AWS_REGION);

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    key(req, file, cb) {
      cb(null, `bsdm/${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
