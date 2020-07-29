const sgMail = require('@sendgrid/mail')

const api = process.env.SENDGRID_API_KEY

sgMail.setApiKey(api)

const senderEmail = 'jurgenklopp.testiti@gmail.com'

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from: senderEmail,
        to: email,
        subject: `Welcome to node-2-udemi ${name}`,
        text: `Welcome to the site ${name}`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        from: senderEmail,
        to: email,
        subject: `Goodbye from node-2-udemi ${name}`,
        text: `Goodbye from the site ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
