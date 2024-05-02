module.exports = (awsKey) => {
  return process.env.LIARA_URL + awsKey + '.png'
}
