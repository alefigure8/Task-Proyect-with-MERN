import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {
  const {name, email, token} = data;

  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"Fred Foo ??" <correo@ejemplo.com">', // sender address
    to: email, // list of receivers
    subject: "Confirmación de registro", // Subject line
    text: "Hola", // plain text body
    html: `<b>Hola ${name}</b>, para confirmar tu registro haz click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar</a>` // html body
  });

}

export const emailForgot = async (data) => {
  const {name, email, token} = data;

  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"Fred Foo ??" <correo@ejemplo.com">', // sender address
    to: email, // list of receivers
    subject: "Restabelece tu password", // Subject line
    text: "Hola", // plain text body
    html: `<b>Hola ${name}</b>, has solicitado cambiar tu password. Has click en el siguiente enlace para poder generar un nuevo password: <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer Password</a>` // html body
  });

}