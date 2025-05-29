import { where } from "sequelize";
import db, { sequelize } from "../models/index";
require("dotenv").config();

let createHandbook = (data) => {
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
        await db.Handbook.create({
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

let getAllHandbook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll({});
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

let getDetailHandbookById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "image",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (data) {
          let doctorHandbook = [];

          doctorHandbook = await db.Doctor_Infor.findAll({
            where: { handbookId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorHandbook = doctorHandbook;
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

let getDetailHandbookByIdNew = (handbookId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!handbookId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }

      let data = await db.Handbook.findOne({
        where: { id: handbookId },
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

let updateHandbook = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing handbook ID!",
        });
      }

      let handbook = await db.Handbook.findOne({
        where: { id: inputData.id },
        raw: false,
      });

      if (!handbook) {
        return resolve({
          errCode: 2,
          errMessage: "Handbook not found!",
        });
      }

      handbook.name = inputData.name;
      handbook.descriptionHTML = inputData.descriptionHTML;
      handbook.descriptionMarkdown = inputData.descriptionMarkdown;

      if (inputData.image) {
        handbook.image = inputData.image;
      }

      await handbook.save();

      return resolve({
        errCode: 0,
        errMessage: "Update successful!",
      });
    } catch (e) {
      console.log("Error in updateHandbook:", e);
      reject(e);
    }
  });
};

let deleteHandbook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }

      await db.Handbook.destroy({
        where: { id: id },
      });

      return resolve({
        errCode: 0,
        errMessage: "Delete successful!",
      });
    } catch (e) {
      console.log("Error in deleteHandbook:", e);
      reject(e);
    }
  });
};

module.exports = {
  createHandbook,
  getAllHandbook,
  getDetailHandbookById,
  updateHandbook,
  deleteHandbook,
  getDetailHandbookByIdNew,
};
