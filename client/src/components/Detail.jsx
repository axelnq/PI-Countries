import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountryDetail } from '../store/actions' 
import {Link} from 'react-router-dom';
import '../css/Detail.css';
import Loading from './Loading'

export default function Detail({match}) {

    let country = useSelector((state) => state.countryDetail)
    let dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const changeState= () => {
        setLoading(true);
        setTimeout(() =>{
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        changeState();
        dispatch(fetchCountryDetail(match.params.id))
    }, [dispatch,match.params.id])

    if(loading) {
        return (
            <div>
            <Loading/>
            </div>
        )
    } else {

   

    return (
        // ,  , , ,  ,,, actividad turistica
        <div>
            {console.log(country)}
            <h2>ID: {country.id} - Country: {country.name} | Continent: {country.continent}</h2>
            <img src={country.flagImage} alt={`Flag of ${country.name}`}/>
            <h3>DETALLES:</h3>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p>Population: {country.population}</p>
            <p>Tourist Activities es un array de nombre "touristactivities"</p>
            
            <Link to='/home'><button>BACK HOME</button></Link>
        </div>
    ) 
    }
}
