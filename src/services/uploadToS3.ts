import { S3 } from "aws-sdk";
import fs from 'fs';

import { config } from "../config";

/**
  * @name uploadToS3
  * @param {string} fileType
  * @param {S3} s3
  * @param {File} fileData
  * @returns {Promise<{success:boolean; message: string; data: object;}>}
*/
export const uploadToS3 = async (fileType: string, s3: S3, fileData?: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);
    const params = {
      Bucket: config.bucket_name,
      Key: fileData!.originalname,
      Body: fileContent,
      ContentType: "image/png"
    };

    try {
      const res = await s3.upload(params).promise();

      console.log("File Uploaded with Successfull", res.Location);

      return { success: true, message: "File Uploaded with Successfull", data: res.Location };
    } catch (error) {
      return { success: false, message: "Unable to Upload the file", data: error };
    }
  } catch (error) {
    return { success: false, message: "Unalbe to access this file", data: {} };
  }
}