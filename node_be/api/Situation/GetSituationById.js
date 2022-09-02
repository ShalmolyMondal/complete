const router = require("express").Router();
const Situation = require("../../models/Situation");

// '/api_v2/situation/get/:id' route
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const situation = await Situation.findById(id);
        res.json(situation);
    } catch (err) {
        res.json({message: err});
    }
    
});


module.exports = router;