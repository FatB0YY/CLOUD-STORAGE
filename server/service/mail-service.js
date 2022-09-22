const nodemailer = require("nodemailer")
const congif = require("config")

class MailService {
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: congif.get('SMTP_HOST'),
      port: congif.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: congif.get('SMTP_USER'),
        pass: congif.get('SMTP_PASSWORD')
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: congif.get('SMTP_USER'),
      to,
      subject: `Активация аккаунта ${congif.get('API_URL')}`,
      text: '',
      html: 
          `
            <div>
              <h1>Для активации перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
            </div>
          `
    })
  }
}

module.exports = new MailService()
