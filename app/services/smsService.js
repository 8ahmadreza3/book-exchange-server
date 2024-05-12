const https = require('https')

module.exports = (to, bodyId) => {
  const authCode = Math.floor(Math.random() * 90000 + 10000).toString()
  console.info(`to: ${to} authCode: ${authCode}`)
  const data = JSON.stringify({
    bodyId: Number(bodyId),
    to,
    args: [authCode]
  })
  const options = {
    hostname: process.env.SMS_HOST,
    port: process.env.SMS_PORT,
    path: process.env.SMS_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  const req = https.request(options, res => {
    if (res.statusCode !== 200) {
      throw new Error(res, 'There was an error sending')
    }
    res.on('data', data => {
      process.stdout.write(data)
    })
  })
  req.on('error', error => {
    throw error
  })
  req.write(data)
  req.end()
  return {
    authCode
  }
}
