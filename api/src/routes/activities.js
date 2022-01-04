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
        const {name, difficulty, duration, season} = req.body;

        const newActivity = await Touristactivity.create({
            name,
            difficulty,
            duration,
            season
        })

        res.json(newActivity);
    } catch (err) {
        next(err);
    }
})




module.exports = router;