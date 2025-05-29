import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";
import aboutController from "../controllers/aboutController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  // router.get("/hoidanit", (req, res) => {
  //   return res.send("Hello World With Huy ne");
  // });
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUse);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser); //rest API

  router.get("/api/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);

  router.get("/api/get-all-doctors", doctorController.getAllDoctors);

  router.post("/api/save-infor-doctors", doctorController.postInforDoctor);

  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.delete("/api/delete-doctor-by-id", doctorController.deleteDoctorById);

  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);

  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );

  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );

  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  //
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.put("/api/update-specialty", specialtyController.updateSpecialty);
  router.delete(
    "/api/delete-specialty",
    specialtyController.handleDeleteSpecialty
  );

  router.get(
    "/api/get-detail-specialty-new-by-id",
    specialtyController.getDetailSpecialtyByIdNew
  );

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.get(
    "/api/get-detail-clinic-new-by-id",
    clinicController.getDetailClinicByIdNew
  );
  router.put("/api/update-clinic", clinicController.updateClinic);
  router.delete("/api/delete-clinic", clinicController.handleDeleteClinic);

  // Lấy thông tin đặt lịch
  router.get(
    "/api/get-list-patient-for-dortor",
    doctorController.getListPatientForDoctor
  );

  // Send remedy
  router.post("/api/send-remedy", doctorController.sendKemedy);

  // Hanbook
  router.post("/api/create-new-handbook", handbookController.createHandbook);
  router.get("/api/get-handbook", handbookController.getAllHandbook);
  router.get(
    "/api/get-detail-handbook-by-id",
    handbookController.getDetailHandbookById
  );
  router.get(
    "/api/get-detail-handbook-new-by-id",
    handbookController.getDetailHandbookByIdNew
  );
  router.put("/api/update-handbook", handbookController.updateHandbook);
  router.delete(
    "/api/delete-handbook",
    handbookController.handleDeleteHandbook
  );

  // About
  router.post("/api/save-video-about", aboutController.updateOrCreateAbout);
  router.get("/api/get-about", aboutController.getAboutContent);
  return app.use("/", router);
};
module.exports = initWebRoutes;
