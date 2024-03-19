const CategoriesModel = require('../../models/categoriesModel')

module.exports = async (req, res, next) => {
  try {
    const { name, address, isRecommend } = req.body
    if (!name || !address) {
      res.send({
        success: false,
        message: 'Enter the information in full',
        message_fa: 'اطلاعات را به صورت کامل وارد کنید'
      })
    }
    const newCategory = new CategoriesModel({
      name,
      address: address.replaceAll(' ', '_'),
      isRecommend
    })
    await newCategory.save()
    res.status(201).send({
      success: true,
      message: 'new category added',
      message_fa: 'دسته جدید اضافه شد'
    })
  } catch (error) {
    next(error)
  }
}
