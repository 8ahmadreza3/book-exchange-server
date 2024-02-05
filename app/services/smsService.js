const MelipayamakApi = require('melipayamak')

const api = new MelipayamakApi(process.env.MELI_USERNAME, process.env.MELI_PASSWORDS)
const sms = api.sms()

module.exports = (to, auth) => {
  const text = `کد اعتبارسنجی شما ${auth}`
  sms.send(to, process.env.MELI_NUMBER, text)
    .then(res => {
      console.log('res' + res)
    }).catch(err => {
      console.log(err)
    })
}
