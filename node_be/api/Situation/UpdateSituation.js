const router = require("express").Router();
const Situation = require('../../models/Situation');

// '/api_v2/situation/update' route
router.patch('/:id', async (req, res) => {
    const situationData = req.body.situationData;
    const query = { _id: req.params.id }
    
    Situation.updateOne(query , situationData, (err , collection) => {
        if (err) {
            console.log(err);
            res.json({msg: "err"});
        };
        
        res.status(200).json(collection);
    });
});

module.exports = router;
