import { S3Client } from "@aws-sdk/client-s3";


const REGION = "us-east-1"; // e.g., "us-east-1"
const ACCESS_KEY_ID = "process.env.AWS_ACCESS_KEY_ID"; // Your IAM user access key ID
const SECRET_ACCESS_KEY = "process.env.AWS_SECRET_ACCESS_KEY"
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  
});
 
export { s3Client };

