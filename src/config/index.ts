require('dotenv').config({ 'path': '.env.local' })

/**
* Config file
*/
export const config: {
  port: number,
  aws_access_key_id: string,
  aws_secret_access_key: string,
  bucket_name: string
} = {
  port: Number(process.env.PORT) ?? 8080,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID ?? " ",
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  bucket_name: process.env.S3_BUCKET_NAME ?? 'test-bucket'
}