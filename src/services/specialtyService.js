import { where } from "sequelize";
import db, { sequelize } from "../models/index";
require("dotenv").config();
let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Successed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Successed!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailSpecialtyById = (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!specialtyId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }

      let data = await db.Specialty.findOne({
        where: { id: specialtyId },
        attributes: [
          "id",
          "name",
          "descriptionHTML",
          "descriptionMarkdown",
          "image",
        ],
      });

      if (data && data.image) {
        data.image = new Buffer(data.image, "base64").toString("binary");
      }

      if (!data) data = {};

      return resolve({
        errCode: 0,
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateSpecialty = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing specialty ID!",
        });
      }

      let specialty = await db.Specialty.findOne({
        where: { id: inputData.id },
        raw: false,
      });

      if (!specialty) {
        return resolve({
          errCode: 2,
          errMessage: "Specialty not found!",
        });
      }

      specialty.name = inputData.name;
      specialty.descriptionHTML = inputData.descriptionHTML;
      specialty.descriptionMarkdown = inputData.descriptionMarkdown;

      if (inputData.image) {
        specialty.image = inputData.image;
      }

      await specialty.save();

      return resolve({
        errCode: 0,
        errMessage: "Update successful!",
      });
    } catch (e) {
      console.log("Error in updateSpecialty:", e);
      reject(e);
    }
  });
};
let deleteSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }

      await db.Specialty.destroy({
        where: { id: id },
      });

      return resolve({
        errCode: 0,
        errMessage: "Delete successful!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailSpecialtyByIdNew = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            // find by location
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
        } else data = {};
        return resolve({
          errMessage: "ok",
          errCode: 0,
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  updateSpecialty: updateSpecialty,
  deleteSpecialty: deleteSpecialty,
  getDetailSpecialtyByIdNew: getDetailSpecialtyByIdNew,
};
