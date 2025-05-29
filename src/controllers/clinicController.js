import clinicService from "../services/clinicService";
let createClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    // console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinic();
    return res.status(200).json(infor);
  } catch (e) {
    // console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    // console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};
let getDetailClinicByIdNew = async (req, res) => {
  try {
    let id = req.query.id;
    let result = await clinicService.getDetailClinicByIdNew(id);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in getDetailSpecialtyById:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let updateClinic = async (req, res) => {
  try {
    let result = await clinicService.updateClinic(req.body);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in updateClinic:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleDeleteClinic = async (req, res) => {
  try {
    let response = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in deleteClinic:", e);
    return res.status(500).json({ errCode: -1, errMessage: "Server error" });
  }
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  updateClinic: updateClinic,
  handleDeleteClinic: handleDeleteClinic,
  getDetailClinicByIdNew: getDetailClinicByIdNew,
};
