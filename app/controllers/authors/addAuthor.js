const AuthorsModel = require('../../models/authorsModel')
// const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { name, birthYear, deadYear, biography, address, isRecommend } = req.body
    if (!name || !address) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    // let awsKey
    // if (req.files.image) {
    //   { awsKey } = await AWS.upload(req.files.image)
    // }

    const newAuthor = new AuthorsModel({
      name,
      birthYear,
      deadYear: deadYear || '-1',
      isRecommend: isRecommend || false,
      biography,
      address: address.replaceAll(' ', '_'),
      img: '', // process.env.LIARA_URL + awsKey + '.png'
      awsKey: '' // awsKey
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
