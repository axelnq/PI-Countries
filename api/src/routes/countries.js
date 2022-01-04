const { Router } = require('express');

const { Country } = require('../db');

const { Op } = require('sequelize');

const axios = require('axios');

const db = require('../db');

const router = Router();

const getApiInfo = async () => {
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
    return countriesApi;
}

router.get('/', async (req, res, next) => {
    /*Imagen de la bandera ,Nombre , Continente ,cantidad de població */

    const {name} = req.query;

    const apiCountries = await getApiInfo();

    try {
        // Si tengo la db con info no hago nada
        var dbCountries = await Country.findAll();
        // Si no tengo datos los creo
        if(!dbCountries.length) {
            await Country.bulkCreate(apiCountries);
            dbCountries = await Country.findAll();
        }
    } catch(error) {
        next(error);
    }

    if(!name) return res.status(200).json(dbCountries.map(country => country.name));

    try {
        let country = await Country.findAll({
            where: { 
                name : {
                    [Op.iLike] : '%' + name + '%' // iLike ignora mayusculas y minisculas y los porcentajes buscan name como substring 
                }
            }
        })
        console.log(country);
        if(Object.keys(country).length === 0) return res.status(400).send({message: "This country doesn't exist."})

        return res.status(200).json(country);
    } catch (error) {
        next(error);
    }
    
})

router.post('/',  (req, res, next) => {
    res.send('soy post /countries');
})


module.exports = router;