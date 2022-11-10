const nodemailer = require("nodemailer");
const { Disc } = require("../models");

const mailSender = async (order, user, items) => {
  let mensaje = "Tu compra fue realizada con exito!\n\n";
  let receptor = user.email;

  for (let i = 0; i < items.length; i++) {
    await Disc.findByPk(items[i].discId).then((disc) => {
      mensaje = `${mensaje}${items[i].cantidad} ${disc.name} ---> ${disc.price} c/u \n`;
      return disc;
    });
  }

  mensaje = `${mensaje}\nDireccion de entrega: ${order.adress}\nLocalidad: ${order.locality}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "VinilizateArgentina@gmail.com",
      pass: "ncyractxhcfybqex",
    },
  });

  const mailOptions = {
    from: "VinilizateArgentina@gmail.com",
    to: receptor,
    subject: "Checkout realizado",
    text: mensaje,
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
