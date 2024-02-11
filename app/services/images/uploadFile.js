const { PutObjectCommand } = require('@aws-sdk/client-s3')

const client = require('./S3')

module.exports = (fileContent, awsKey) => {
  const params = {
    Body: fileContent,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: awsKey
  }
  client.send(new PutObjectCommand(params), (error, data) => {
    if (error) {
      return error
    }
    return data.$metadata.httpStatusCode
  })
}
