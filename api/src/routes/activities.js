const { Router } = require('express');

const { Touristactivity } = require('../db');


const router = Router();


router.get('/',  (req, res, next) => {
    res.send('soy get /activities');
})

/*
Nombre
Dificultad
Duración
Temporada
*/

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
        
        await activity.setCountries(countriesArray) // countriesIds seria countriesArray
        
        res.json({created:created,activity})
    } catch (err) {
        next(err);
    }
})




module.exports = router;