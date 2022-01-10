const { Router } = require('express');

const { Country, Touristactivity } = require('../db');

const { Op } = require('sequelize');

const axios = require('axios');

const db = require('../db');

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    console.log('llamado a la api')
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
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const countriesApiDetail = await apiUrl.data.find(country => id === country.cca3)
    return {
        subregion: countriesApiDetail.subregion,
        area: countriesApiDetail.area
    };
}

router.get('/', async (req, res, next) => {
    /*Imagen de la bandera ,Nombre , Continente ,cantidad de població */

    const {name} = req.query;


    try {
        // Si tengo la db con info no hago nada
        var dbCountries = await Country.findAll({
            include:Touristactivity
        });
        // Si no tengo datos los creo
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
    //

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

router.get('/:idPais',  async (req, res, next) => {
    /* 
    Subregión
    Área (Mostrarla en km2 o millones de km2)
    Actividades turísticas con toda su información asociada
    */
    const {idPais} = req.params;
    const countryDb = await Country.findOne({
        where: {id: idPais},
        include: Touristactivity
    })
    /* COUNTRYDB TRAE : 
    - Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
     - Código de país de 3 letras (id)
     Capital
    */
    const countryDetailApi = await getApiInfoDetail(idPais);
    
    countryDb['subregion'] = countryDetailApi.subregion;
    countryDb['area'] = countryDetailApi.area;
    
    
    res.send(countryDb);
})


router.post('/:countryId/activity/:activityId', async (req, res, next) => {
    try {
        const {countryId, activityId} = req.params;
        const country = await Country.findByPk(countryId);
        await country.addTouristactivity(activityId);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
})


module.exports = router;