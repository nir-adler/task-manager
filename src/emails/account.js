const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)
// const msg = {
//   to: 'nira7008@gmail.com', // Change to your recipient
//   from: 'nira7008@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const sendWelcomeEmail = async (email, name) => {
    return sgMail.send({
        to: email,
        from: 'nira7008@gmail.com', // Change to your
        subject: 'Thanks for joinin in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = async (email, name) => {
    return sgMail.send({
        to: email,
        from: 'nira7008@gmail.com', // Change to your
        subject: 'Sorry for leaving, hope to see you again!',
        text: `Sorry ${name} for leaving, hope to see you again!`
    })
}


module.exports = { sendWelcomeEmail, sendCancelationEmail }