import nodemailer from 'nodemailer'

function getMailTransport() {
    return nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
        }
    })
}

async function sendMail(content) {
    const mailTransport = getMailTransport()
    return await mailTransport.sendMail(content)
}

export { sendMail }
