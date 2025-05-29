// const { Model } = require("sequelize/types");
import specialtyService from "../services/specialtyService";
let createSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    // console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialty();
    return res.status(200).json(infor);
  } catch (e) {
    // console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let id = req.query.id;
    let result = await specialtyService.getDetailSpecialtyById(id);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in getDetailSpecialtyById:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailSpecialtyByIdNew = async (req, res) => {
  try {
    let id = req.query.id;
    let result = await specialtyService.getDetailSpecialtyByIdNew(
      id,
      req.query.location
    );
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in getDetailSpecialtyById:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let updateSpecialty = async (req, res) => {
  try {
    let result = await specialtyService.updateSpecialty(req.body);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in updateSpecialty:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleDeleteSpecialty = async (req, res) => {
  try {
    let response = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ errCode: -1, errMessage: "Server error" });
  }
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  updateSpecialty: updateSpecialty,
  handleDeleteSpecialty: handleDeleteSpecialty,
  getDetailSpecialtyByIdNew: getDetailSpecialtyByIdNew,
};
