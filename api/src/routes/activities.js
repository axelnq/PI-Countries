const { Router } = require('express');

const { Touristactivity, Country } = require('../db');


const router = Router();


router.get('/',  async (req, res, next) => {

    try {
        var dbActivities = await Touristactivity.findAll({include:Country});

        return res.status(200).send(dbActivities);
    } catch(error) {
        next(error);
    }
   

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
        
        await activity.addCountries(countriesArray) 
       
        return res.status(200).send({created:created,activity})
    } catch (err) {
        next(err);
    }
    
})




module.exports = router;