const nodemailer = require("nodemailer");

const mailSender = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "VinilizateArgentina@gmail.com",
      pass: "ncyractxhcfybqex",
    },
  });

  const mailOptions = {
    from: "VinilizateArgentina@gmail.com",
    to: "agustinsa1999@gmail.com",
    subject: "prueba 2",
    text: "otro mail de prueba",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};

module.exports = { mailSender };
