import { where } from "sequelize";
import db, { sequelize } from "../models/index";
require("dotenv").config();
let updateOrCreateAbout = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.videoLink ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let about;

        if (data.id) {
          about = await db.About.findOne({
            where: { id: data.id },
            raw: false,
          });
        }

        if (about) {
          about.name = data.name;
          about.videoLink = data.videoLink;
          about.descriptionHTML = data.descriptionHTML;
          about.descriptionMarkdown = data.descriptionMarkdown;

          await about.save();

          resolve({
            errCode: 0,
            errMessage: "Updated successfully!",
          });
        } else {
          // Không có -> tạo mới
          await db.About.create({
            name: data.name,
            videoLink: data.videoLink,
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
          });

          resolve({
            errCode: 0,
            errMessage: "Created successfully!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAboutContent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.About.findOne();

      if (data) {
        resolve({
          errCode: 0,
          errMessage: "Success!",
          data,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "No content found.",
          data: null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  updateOrCreateAbout: updateOrCreateAbout,
  getAboutContent: getAboutContent,
};
