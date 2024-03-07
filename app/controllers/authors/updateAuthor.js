const AuthorsModel = require('../../models/authorsModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    const newAddress = req.body.address.replaceAll(' ', '_')
    if (newAddress && newAddress !== address) {
      const sameAddress = await AuthorsModel.findOne({ address: newAddress })
      if (sameAddress) {
        res.send({
          success: false,
          message: 'This address is duplicate',
          message_fa: 'این آدرس تکراری است'
        })
      }
    }
    const { n, nModified } = await AuthorsModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: false,
        message: 'can not update author',
        message_fa: 'نمی توان نویسنده را به روز کرد'
      })
    }
    res.send({
      success: true,
      message: 'Author information updated',
      message_fa: 'اطلاعات نویسنده به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
