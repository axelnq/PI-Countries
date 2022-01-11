const { Router } = require('express');

const { Touristactivity, Country } = require('../db');


const router = Router();


router.get('/',  async (req, res, next) => {
    try {
        // Si tengo la db con info no hago nada
        var dbActivities = await Touristactivity.findAll(({
            include:Country
        }));

    } catch(error) {
        next(error);
    }
    res.send(dbActivities);
})

router.post('/',  async (req, res, next) => {

    try {
        const {name, difficulty, duration, season, countriesArray} = req.body;
       
        let [activity, created] = await Touristactivity.findOrCreate({
            where: {
                name,
                difficulty,
                duration,
                season
            },
           
        })
        
        await activity.setCountries(countriesArray) 
       
        res.json({created:created,activity})

    } catch (err) {
        next(err);
    }
})




module.exports = router;