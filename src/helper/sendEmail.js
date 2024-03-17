const nodemailer = require("nodemailer");
const env = require("dotenv").config().parsed;
const fs = require('fs');
const path = require('path');
const htmlFilePath = path.join(__dirname, 'email.html');

// main().catch(console.error);
class sendEmail {
    readHTMLFile = async (path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                reject(err);
                } else {
                resolve(html);
                }
            });
        });
    }
    sendEmail = async(req, res) => {
        try {
            const { to,subject, message } = req.body;

            // membaca file html
            let htmlContent = await this.readHTMLFile(htmlFilePath);
            const recipientName = to.split('@')[0];
            htmlContent = htmlContent.replace('{{name}}', recipientName).replace('{{message}}', message);
            const transporter = nodemailer.createTransport({
                host: env.MAILTRAP_HOST,
                port: env.MAILTRAP_PORT,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: env.MAILTRAP_USERNAME,
                    pass: env.MAILTRAP_PASSWORD,
                },
            });

            const info = await transporter.sendMail({
                from: '"Example Sender" <sender@example.com>', // sender address
                to: to, // list of receivers
                subject: subject, // Subject lin
                html: htmlContent , // html body
            });
            // if(err)
            return res.json({message: info});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
module.exports = new sendEmail();