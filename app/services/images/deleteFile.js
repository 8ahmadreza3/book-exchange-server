const { DeleteObjectCommand } = require('@aws-sdk/client-s3')
const client = require('./S3.js')

module.exports = (awsKey) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: awsKey
  }
  client.send(new DeleteObjectCommand(params), (error, data) => {
    if (error) {
      return {
        success: false,
        error
      }
    }
    return {
      success: true
    }
  })
}
