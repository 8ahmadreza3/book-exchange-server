const notFound = (req, res, next) => {
  res.status(404).send({
    status: 404,
    message: 'requested resource could not be found'
  })
}
module.exports = notFound
