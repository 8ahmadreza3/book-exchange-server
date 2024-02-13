const { PutObjectCommand } = require('@aws-sdk/client-s3')
const client = require('./S3')
const { v4: uuidv4 } = require('uuid')
const getUrl = require('./getUrlFile')

module.exports = (fileContent) => {
  const awsKey = uuidv4()
  const params = {
    Body: fileContent,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `${awsKey}.png`
  }
  client.send(new PutObjectCommand(params), (error, data) => {
    if (!error) {
      const url = getUrl(awsKey)
      if (!url.success){
        return {
          success: true,
          error,
          url,
          awsKey
        }
      }
      return url
    }
    return {
      success: false,
      message: 'Error uploading image',
      message_fa: 'خطا در آپلود تصویر',
      error
    }
  })
}
