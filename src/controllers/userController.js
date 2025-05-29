import userService from "../services/userService";
const CRUDService = require("../services/userService"); // ⚠ Kiểm tra đúng đường dẫn

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUse = async (req, res) => {
  let id = req.query.id; // All, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  // return res.status(200).json({
  //   errCode: 1,
  //   errMessage: "OK",
  //   users,
  // });
  // Nếu users có dữ liệu, trả về errCode = 0
  if (users && users.length > 0) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      users,
    });
  } else {
    return res.status(200).json({
      errCode: 2, // Đổi errCode để báo "Không có dữ liệu"
      errMessage: "No users found",
      users: [],
    });
  }
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await CRUDService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    // console.log("data là gì: ", data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUse: handleGetAllUse,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
  getAllCode: getAllCode,
};
