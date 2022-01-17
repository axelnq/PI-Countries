const { Router } = require('express');

const { Country, Touristactivity } = require('../db');

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

const getApiInfoDetail = async (id) => {

    const apiCountryDetail = await axios.get('https://restcountries.com/v3/alpha/' + id);
    
    let country = apiCountryDetail.data[0]
    let capital = "";
    country.capital ? capital = country.capital[0] : capital = "Without capital"
    return {
        id: country.cca3,
        name: country.name.common,
        continent:country.region,
        population:country.population,
        flagImage:country.flags[0],
        capital:capital,
        subregion: country.subregion,
        area: country.area
    };
}

router.get('/', async (req, res, next) => {

    const {name} = req.query;


    try {
        // If I have the db with info , don't do anything
        var dbCountries = await Country.findAll({
            include:Touristactivity
        });
        // If it is empty , create the countries with the api info
        if(!dbCountries.length) {
            const apiCountries = await getApiInfo();
            await Country.bulkCreate(apiCountries);
            dbCountries = await Country.findAll({
                include:Touristactivity
            });
        }
    } catch(error) {
        next(error);
    }

    if(!name) return res.status(200).json(dbCountries);
    
    try {
        let country = await Country.findAll({
            where: { 
                name : {
                    [Op.iLike] : '%' + name + '%' // iLike ignora mayusculas y minisculas y los porcentajes buscan name como substring 
                }
            }
        })
        
        if(Object.keys(country).length === 0) return res.status(404).send({message: "This country doesn't exist."})

        return res.status(200).json(country);
    } catch (error) {
        next(error);
    }
    
})

router.get('/:idPais',  async (req, res, next) => {
  
    const {idPais} = req.params;
    
    try {
        const country = await getApiInfoDetail(idPais);
        const countryDb = await Country.findOne({
            where: {id: idPais},
            include: Touristactivity,
        })
   
        countryDb.touristactivities ? country['touristactivities'] = countryDb.touristactivities : null;
       
        return res.status(200).send(country);
    } catch(error) {
        error.message = "The ID doesn't exist"
        next(error);
    }

})

module.exports = router;