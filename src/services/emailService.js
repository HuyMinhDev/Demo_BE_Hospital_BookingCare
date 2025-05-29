require("dotenv").config();
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"MINHHUY 🏥" <nguyenminhhuy2410@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
    // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2d89ef;">Xin chào ${dataSend.patientName}!</h2>
        <p>Bạn đã đặt lịch khám bệnh online thành công thông qua hệ thống <strong>BookingCare</strong>.</p>

        <h3 style="margin-top: 20px;">📝 Thông tin đặt lịch:</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>⏰ Thời gian:</strong> ${dataSend.time}</li>
            <li><strong>👨‍⚕️ Bác sĩ:</strong> ${dataSend.doctorName}</li>
        </ul>

        <p>Vui lòng xác nhận lịch hẹn bằng cách nhấn vào đường link bên dưới:</p>
        <p style="margin: 30px 0;">
            <a href="${dataSend.redirectLink}" target="_blank"
            style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Xác nhận lịch hẹn
            </a>
        </p>

        <p>Chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        <p style="margin-top: 30px;">Trân trọng,<br/><strong>MINHHUY 🏥</strong></p>
    </div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2d89ef;">Hello ${dataSend.patientName}!</h2>
        <p>You have successfully booked an online medical appointment through the <strong>BookingCare</strong> system.</p>
  
        <h3 style="margin-top: 20px;">📝 Appointment Details:</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>⏰ Time:</strong> ${dataSend.time}</li>
            <li><strong>👨‍⚕️ Doctor:</strong> ${dataSend.doctorName}</li>
        </ul>
  
        <p>Please confirm your appointment by clicking the link below:</p>
        <p style="margin: 30px 0;">
            <a href="${dataSend.redirectLink}" target="_blank"
            style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Confirm Appointment
            </a>
        </p>
  
        <p>Thank you very much for using our service!</p>
        <p style="margin-top: 30px;">Sincerely,<br/><strong>MINHHUY 🏥</strong></p>
    </div>
    `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  // console.log("Check dataSend: ", dataSend);
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 30px;">
        <h2 style="color: #2d89ef; margin-bottom: 20px;">Xin chào ${dataSend.patientName},</h2>
        
        <p style="font-size: 16px; color: #555;">
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ khám bệnh trực tuyến của <strong>BookingCare</strong>.
        </p>
       
        <p style="font-size: 16px; color: #555;">
          Bạn đã hoàn tất khám bệnh thành công. Chúng tôi sẽ tiếp tục đồng hành và hỗ trợ bạn trong quá trình chăm sóc sức khỏe.
        </p>

        <p style="margin-top: 20px; font-size: 16px; color: #555;">
          Nếu bạn cần hỗ trợ thêm hoặc có thắc mắc, vui lòng liên hệ lại với chúng tôi bất cứ lúc nào.
        </p>

        <p style="margin-top: 40px; font-size: 16px; color: #333;">
          Trân trọng,<br/>
          <strong>MINHHUY 🏥</strong>
        </p>
      </div>
    </div>
    `;
  }

  if (dataSend.language === "en") {
    result = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 30px;">
        <h2 style="color: #2d89ef; margin-bottom: 20px;">Hello ${dataSend.patientName},</h2>

        <p style="font-size: 16px; color: #555;">
          Thank you for using <strong>BookingCare</strong> to book your medical appointment.
        </p>


        <p style="font-size: 16px; color: #555;">
          You have successfully completed your medical appointment. We are here to assist you in your healthcare journey.
        </p>

        <p style="margin-top: 20px; font-size: 16px; color: #555;">
          If you need any support or have questions, feel free to reach out to us anytime.
        </p>

        <p style="margin-top: 40px; font-size: 16px; color: #333;">
          Sincerely,<br/>
          <strong>MINHHUY 🏥</strong>
        </p>
      </div>
    </div>
    `;
  }

  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"MINHHUY 🏥" <nguyenminhhuy2410@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${dataSend.patientId}-${
              dataSend.patientName
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
        // html body
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
