const { Router } = require('express');

const { Country } = require('../db');

const axios = require('axios');

const router = Router();


router.get('/', async (req, res, next) => {

    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const countriesApi = await apiUrl.data.map(country => {
        return {
            name: country.name
        }
    }
        
    )
  
    res.send('soy get /countries');
})

router.post('/',  (req, res, next) => {
    res.send('soy post /countries');
})

router.delete('/',  (req, res, next) => {
    res.send('soy delete /countries');
})

router.put('/',  (req, res, next) => {
    res.send('soy delete /countries');
})



module.exports = router;