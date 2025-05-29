import aboutService from "../services/aboutService";
let updateOrCreateAbout = async (req, res) => {
  try {
    let infor = await aboutService.updateOrCreateAbout(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
};
let getAboutContent = async (req, res) => {
  try {
    const data = await aboutService.getAboutContent();
    return res.status(200).json(data);
  } catch (e) {
    console.error("Error in getAboutContent:", e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  updateOrCreateAbout: updateOrCreateAbout,
  getAboutContent: getAboutContent,
};
