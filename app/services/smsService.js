const MelipayamakApi = require('melipayamak')
const toPersianDigits = require('./persianDigits')
const api = new MelipayamakApi(process.env.MELI_USERNAME, process.env.MELI_PASSWORDS)
const sms = api.sms()

module.exports = (to, authCode) => {
  authCode = toPersianDigits(authCode)
  to = to.toString().replace('0', '+98')
  const text = `
  همای کتاب
  کد احراز شماره تلفن شما :
  ${authCode}`
  sms.send(to, process.env.MELI_NUMBER, text)
    .then().catch(err => {
      throw err
    })
}
