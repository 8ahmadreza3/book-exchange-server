const RequestModel = require('../../models/requestsModel')
const AWS = require('../../services/AWS')

module.exports = async (req, res, next) => {
  try {
    const { owner, book, conditions, printYear } = req.body

    const upload = AWS.upload(req.files.image)
    if (!upload.success) {
      return res.send(upload)
    }

    const newRequest = new RequestModel({
      owner,
      book,
      printYear,
      img: upload.url,
      awsKey: upload.awsKey,
      createdAt: new Date(),
      applicants: [],
      conditions,
      status: 'درانتظار تائید'
    })
    await newRequest.save()
    res.status(201).send({
      success: true,
      message: 'Book loan request was registered',
      message_fa: 'درخواست امانت کتاب ثبت شد'
    })
  } catch (error) {
    next(error)
  }
}
