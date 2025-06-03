import { where } from "sequelize";
import db, { sequelize } from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const moment = require("moment");
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeString || // ngày giờ đặt từ đây
        !data.timeType ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address ||
        !data.date
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
        return;
      }

      // Parse ngày đặt từ timeString: ví dụ "8:00 - 9:00 - Thứ năm - 22/05/2025"
      // Lấy ngày cuối cùng sau dấu '-' và trim
      // Xác định ngôn ngữ từ data.language
      let isVietnamese = data.language === "vi";

      // Parse ngày từ timeString
      let timeStringParts = data.timeString.split("-");
      let dateString = timeStringParts[timeStringParts.length - 1].trim(); // "22/05/2025" hoặc "05/22/2025"

      // Parse theo format đúng ngôn ngữ
      let appointmentDate = moment(
        dateString,
        isVietnamese ? "DD/MM/YYYY" : "MM/DD/YYYY"
      ).format("YYYY-MM-DD");

      // Tìm user hoặc tạo mới
      let [user, createdUser] = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: "R3",
          firstName: data.fullName,
          gender: data.selectedGender,
          address: data.address,
          phonenumber: data.phoneNumber,
          // dateOfBirth: new Date(Number(data.date)),
          // date: data.date,
          // appointmentDate: appointmentDate,
        },
      });
      // console.log("user:", user);
      // console.log("type of user:", typeof user);
      // console.log("is Sequelize model instance:", user instanceof db.User);
      if (!createdUser) {
        let userInstance = await db.User.findOne({
          where: { id: user.id },
          raw: false,
        });

        if (userInstance) {
          await userInstance.update({
            firstName: data.fullName,
            gender: data.selectedGender,
            address: data.address,
            phonenumber: data.phoneNumber,
          });
        }
      }
      // Check bệnh nhân đã đặt lịch ngày đó chưa
      let existingBooking = await db.Booking.findOne({
        where: {
          patientId: user.id,
          appointmentDate: appointmentDate,
        },
      });

      if (existingBooking) {
        resolve({
          errCode: 2,
          errMessage:
            "Bạn đã đặt lịch trong ngày này rồi, mỗi ngày chỉ được đặt một lần thôi nha!",
        });
        return;
      }

      // Tạo token
      let token = uuidv4();

      // Gửi email xác nhận
      await emailService.sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redirectLink: buildUrlEmail(data.doctorId, token),
      });

      // Tạo booking mới
      await db.Booking.create({
        statusId: "S1",
        doctorId: data.doctorId,
        patientId: user.id,
        date: data.date,
        appointmentDate: appointmentDate,
        timeType: data.timeType,
        token: token,
      });

      resolve({
        errCode: 0,
        errMessage: "Đặt lịch thành công!",
      });
    } catch (e) {
      console.log("Tôi đang bị lỗi khi đặt lịch: ", e);
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        console.log("Tôi bị lỗi gửi email 2: ", e);
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        // console.log("Check appointment: ", appointment);
        if (appointment) {
          // await appointment.save({
          //   statusId: "S2",
          // });
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment successed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appoinment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
