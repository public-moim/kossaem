const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config();
const crypto = require('crypto')
const {promisify} = require('util')
const randomBytes = promisify(crypto.randomBytes)

const bucketName = 'kossaem-quiz'
const s3 = new AWS.S3({
    
    accessKeyId:process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_S3_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
})

export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const fileName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: fileName,
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject',params)
    return uploadURL
}