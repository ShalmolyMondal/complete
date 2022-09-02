const router = require("express").Router();
const addSituation = require("./AddSituation");
const getAllSituation = require("./GetAllSituations");
const getSituationById = require("./GetSituationById");
const deleteSituation = require("./DeleteSituation");
const updateSituation = require("./UpdateSituation");

router.use("/create", addSituation);
router.use("/all", getAllSituation);
router.use("/get", getSituationById);
router.use("/delete", deleteSituation);
router.use("/update", updateSituation);

module.exports = router;
