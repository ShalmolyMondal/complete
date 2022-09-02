const router = require("express").Router();
const Situation = require("../../models/Situation");

// '/api_v2/situation/all' route
router.get('/', async (req, res) => {
    try {
        const situations = await Situation.find();
        res.json(situations);
    } catch (err) {
        res.json({message: err});
    }
    
});


module.exports = router;