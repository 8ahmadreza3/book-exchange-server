const AWS = require('../services/AWS')

module.exports.uploadImg = async (req, res, next) => {
  try {
    const { imgFile } = req.body
    if (!imgFile) {
      return res.send({
        success: false,
        message: '',
        message_fa: ''
      })
    }
    const res = await AWS.upload()
    res.send({
      success: true,
      message: 'new author New author added',
      message_fa: 'نویسنده جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
