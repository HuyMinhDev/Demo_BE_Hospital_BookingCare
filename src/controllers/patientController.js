import patientService from "../services/patientService";
let postBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Tôi đang bị lỗi khi đặt lịch: ", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};
let postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postVerifyBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Tôi bị lỗi gửi email 1: ", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
