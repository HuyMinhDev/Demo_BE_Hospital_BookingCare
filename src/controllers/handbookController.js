import handbookService from "../services/handbookService";

let createHandbook = async (req, res) => {
  try {
    let infor = await handbookService.createHandbook(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};

let getAllHandbook = async (req, res) => {
  try {
    let infor = await handbookService.getAllHandbook();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(">>>> Lỗi không lấy All Handbook: ", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};

let getDetailHandbookById = async (req, res) => {
  try {
    let infor = await handbookService.getDetailHandbookById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};

let getDetailHandbookByIdNew = async (req, res) => {
  try {
    let id = req.query.id;
    let result = await handbookService.getDetailHandbookByIdNew(id);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in getDetailHandbookByIdNew:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateHandbook = async (req, res) => {
  try {
    let result = await handbookService.updateHandbook(req.body);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error in updateHandbook:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleDeleteHandbook = async (req, res) => {
  try {
    let response = await handbookService.deleteHandbook(req.body.id);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in deleteHandbook:", e);
    return res.status(500).json({ errCode: -1, errMessage: "Server error" });
  }
};

module.exports = {
  createHandbook,
  getAllHandbook,
  getDetailHandbookById,
  updateHandbook,
  handleDeleteHandbook,
  getDetailHandbookByIdNew,
};
