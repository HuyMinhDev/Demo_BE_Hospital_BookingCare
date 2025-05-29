import { where } from "sequelize";
import db, { sequelize } from "../models/index";
require("dotenv").config();
let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
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
let getAllClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
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
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "image",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
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
let getDetailClinicByIdNew = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!clinicId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }

      let data = await db.Clinic.findOne({
        where: { id: clinicId },
        attributes: [
          "id",
          "name",
          "address",
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

let updateClinic = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing clinic ID!",
        });
      }

      let clinic = await db.Clinic.findOne({
        where: { id: inputData.id },
        raw: false,
      });

      if (!clinic) {
        return resolve({
          errCode: 2,
          errMessage: "Clinic not found!",
        });
      }

      clinic.name = inputData.name;
      clinic.address = inputData.address;
      clinic.descriptionHTML = inputData.descriptionHTML;
      clinic.descriptionMarkdown = inputData.descriptionMarkdown;

      if (inputData.image) {
        clinic.image = inputData.image;
      }

      await clinic.save();

      return resolve({
        errCode: 0,
        errMessage: "Update successful!",
      });
    } catch (e) {
      console.log("Error in updateClinic:", e);
      reject(e);
    }
  });
};

let deleteClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }

      await db.Clinic.destroy({
        where: { id: id },
      });

      return resolve({
        errCode: 0,
        errMessage: "Delete successful!",
      });
    } catch (e) {
      console.log("Error in deleteClinic:", e);
      reject(e);
    }
  });
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  updateClinic: updateClinic,
  deleteClinic: deleteClinic,
  getDetailClinicByIdNew: getDetailClinicByIdNew,
};
