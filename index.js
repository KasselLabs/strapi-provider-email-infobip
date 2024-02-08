const axios = require('axios')
const FormData = require('form-data')

const formatEmailToFormData = (from, replyTo, to, bcc, subject, text, html) => {
  const emailData = new FormData()
  emailData.append('from', from)
  emailData.append('to', to)

  if (replyTo) {
    emailData.append('replyTo', replyTo)
  }
  if (bcc) {
    emailData.append('bcc', bcc)
  }
  if (subject) {
    emailData.append('subject', subject)
  }
  if (text) {
    emailData.append('text', text)
  }
  if (html) {
    emailData.append('html', html)
  }
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
          to, bcc, subject, text, html
        } = options

        const emailData = formatEmailToFormData(
          from,
          replyTo,
          to,
          bcc,
          subject,
          text,
          html
        )

        await axios.request({
          url: `https://${baseURL}/email/3/send`,
          method: 'POST',
          headers: {
            Authorization: `App ${apiKey}`,
            ...emailData.getHeaders()
          },
          data: emailData
        })
      }
    }
  }
}
