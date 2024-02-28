const MelipayamakApi = require('melipayamak')
const toFarsiNumber = require('./persianDigits')
const api = new MelipayamakApi(process.env.MELI_USERNAME, process.env.MELI_PASSWORDS)
const sms = api.sms()

module.exports = (to, authCode) => {
  authCode = toFarsiNumber(authCode)
  to = to.toString().replace('0', '+98')
  const text = `کد اعتبارسنجی شما ${authCode}`
  sms.send(to, process.env.MELI_NUMBER, text)
    .then(res => {
      console.log(res)
    }).catch(err => {
      throw err
    })
}
