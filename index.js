const axios = require('axios')
const FormData = require('form-data')

const formatEmailToFormData = (from, replyTo, to, subject, text, html) => {
  const emailData = new FormData()
  emailData.append('from', from)
  emailData.append('replyTo', replyTo)
  emailData.append('to', to)
  emailData.append('subject', subject)
  emailData.append('text', text)
  emailData.append('html', html)
  return emailData
}

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async options => {
        const { apiKey, baseURL } = providerOptions
        const {
          from = settings.defaultFrom,
          replyTo = settings.defaultReplyTo,
          to, subject, text, html
        } = options

        const emailData = formatEmailToFormData(from, replyTo, to, subject, text, html)

        try {
          await axios.request({
            url: `https://${baseURL}/email/3/send`,
            method: 'POST',
            headers: {
              Authorization: `App ${apiKey}`,
              ...emailData.getHeaders()
            },
            data: emailData
          })
        } catch (error) {
          console.log(error.response.data)
        }
      }
    }
  }
}
