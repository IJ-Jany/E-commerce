import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service:"gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "isratjany87@gmail.com",
    pass: "evao shxe mooi exzs",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function mail(to,subject,text="",html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"isratjany87@gmail.com" <jany@gmail.com>', // sender address
    to,// list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

}
