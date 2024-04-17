const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { name, birthYear, deadYear, biography, awsKey, address, isRecommend } = req.body
    if (!name || !address) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    const img = awsKey ? process.env.LIARA_URL + awsKey + '.png' : ''
    const newAuthor = new AuthorsModel({
      name,
      birthYear,
      deadYear: deadYear || '-1',
      isRecommend: isRecommend || false,
      biography,
      address: address.replaceAll(' ', '_'),
      img,
      awsKey: awsKey || ''
    })
    await newAuthor.save()
    res.status(201).send({
      success: true,
      message: 'new author New author added',
      message_fa: 'نویسنده جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
