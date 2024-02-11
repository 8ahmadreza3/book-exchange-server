const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const client = require('./S3')

module.exports = (awsKey) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: awsKey
  }
  getSignedUrl(client, new GetObjectCommand(params))
    .then(signature => {
      console.log(signature)
    })
    .catch(error => {
      return error
    })
}
