const AWS = require('../../services/AWS')

module.exports.uploadImg = async (req, res, next) => {
  try {
    const imgFile = req.file
    if (!imgFile) {
      return res.send({
        success: false,
        message: 'The photo could not be uploaded',
        message_fa: 'عکس آپلود نشد'
      })
    }
    const { response, awsKey } = await AWS.upload(imgFile.buffer)
    if (response.$metadata.httpStatusCode !== 200) {
      return res.send({
        success: false,
        message: 'The photo could not be uploaded',
        message_fa: 'عکس آپلود نشد'
      })
    }
    const url = `https://kara-library.storage.iran.liara.space/${awsKey}.png`
    res.send({
      success: true,
      message: 'Photo uploaded',
      message_fa: 'عکس آپلود شد',
      data: {
        awsKey,
        img: url
      }
    })
  } catch (error) {
    next(error)
  }
}
