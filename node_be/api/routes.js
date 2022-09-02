const router = require("express").Router();
const situationRoutes = require("./Situation");

router.get("/", (req, res) => {
	res.status(200).send("Succesful get to /api route");
});


// '/api_v2/test' route
router.get('/test', async (req, res) => {
	res.json({success: true});
});

router.use("/situation", situationRoutes);

module.exports = router;
