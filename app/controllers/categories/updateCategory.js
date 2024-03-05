const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(404).send({
        success: false,
        message: 'Invalid category',
        message_fa: 'دسته نامعتبر'
      })
    }
    if (req.body.address) {
      req.body.address = req.body.address.replaceAll(' ', '_')
      const sameAddress = await CategoriesModel.findOne({ address: req.body.address })
      if (sameAddress) {
        res.send({
          success: false,
          message: 'This address is duplicate',
          message_fa: 'این آدرس تکراری است'
        })
      }
    }
    const { n, nModified } = await CategoriesModel.updateOne({ address }, { ...req.body })
    if (n === 0 || nModified === 0) {
      return res.status(404).send({
        success: true,
        message: 'can not update category',
        message_fa: 'نمی توان دسته را به روز کرد'
      })
    }
    res.send({
      success: true,
      message: 'Category information has been updated',
      message_fa: 'اطلاعات دسته به روز شد'
    })
  } catch (error) {
    next(error)
  }
}
