import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIA4H3HQPH77EQFMUIQ",
  secretAccessKey: "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",
  region: "eu-north-1",

});

const s3 = new AWS.S3();
export default s3;
