const nodemailer = require('nodemailer');

require('dotenv').config();
const mail = {
  user: process.env.EMAIL_EMAIL,
  pass: process.env.PASSWORD_EMAIL
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

  const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `
            <img
              class="logo__inicioSesion"
              src="assets\img\logo.png"
              alt="Logo Help paws"
            /> 
            <${ mail.user }>
            `, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Somos HelpPaws", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error, email);
    }
  }

  const getTemplate = ( nombres, apellidos, token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <img
              class="logo__inicioSesion"
              src="assets\img\logo.png"
              alt="Logo Help paws"
            />
            <h2>${ nombres + apellidos}</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:3000/confirmaEmail/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      `;
  }

module.exports = {
  sendEmail,
  getTemplate
}

// <img src="https://i.imgur.com/eboNR82.png" alt="">