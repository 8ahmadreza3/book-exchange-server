const { PutObjectCommand } = require('@aws-sdk/client-s3')
const client = require('./S3')
const { v4: uuidv4 } = require('uuid')

module.exports = (fileContent) => {
  const awsKey = uuidv4()
  const params = {
    Body: fileContent,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `${awsKey}.png`
  }
  client.send(new PutObjectCommand(params), (error, data) => {
    if (error) {
      return {
        success: false,
        error,
        awsKey
      }
    }
    return {
      success: true,
      status: data.$metadata.httpStatusCode,
      awsKey
    }
  })
}
