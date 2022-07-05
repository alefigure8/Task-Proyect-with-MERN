import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {
  const {name, email, token} = data;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "445f7ff77f7b3c",
      pass: "2a3d352660a884"
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
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "445f7ff77f7b3c",
      pass: "2a3d352660a884"
    }
  });

  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"Fred Foo ??" <correo@ejemplo.com">', // sender address
    to: email, // list of receivers
    subject: "Confirmación de registro", // Subject line
    text: "Hola", // plain text body
    html: `<b>Hola ${name}</b>, para confirmar tu registro haz click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Confirmar</a>` // html body
  });

}