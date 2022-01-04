const { Router } = require('express');

const { Country } = require('../db');

const axios = require('axios');

const router = Router();


router.get('/', async (req, res, next) => {
    /*
    Imagen de la bandera
    Nombre
    Continente
    cantidad de población
    */

    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const countriesApi = await apiUrl.data.map(country => {
        let capital = "";
        country.capital ? capital = country.capital[0] : capital = "Without capital"
        return {
            id: country.cca3,
            name: country.name.common,
            continent:country.region,
            population:country.population,
            flagImage:country.flags[0],
            capital:capital // No lo pide en la ruta principal pero es obligatorio para agregar a la base de datos
        }
    })
    /*
    countriesApi.map(async country => {
        let newCountry = await Country.create({
            id:country.id,
            name:country.name,
            continent:country.region,
            population:country.population,
            flagImage:country.flagImage,
            capital:country.capital
        })
        return newCountry;
    })
    */
  
    countriesApi.forEach(async (country,index) => {
       await Country.create({
           ...country
       })
    })

    
    // antartica index 230 , no tiene capital
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