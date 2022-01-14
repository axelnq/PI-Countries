import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountryDetail } from '../store/actions' 
import {Link} from 'react-router-dom';
import styles from '../css/Detail.module.css';
import Loading from './Loading'

export default function Detail({match}) {

    let country = useSelector((state) => state.countryDetail)
    let dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    const changeState= () => {

        setLoading(true);
        setTimeout(() =>{
            setLoading(false);
        }, 1300)
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
        <div className={styles.detailCountry}>
            <h2 >ID: {country.id} - Country: {country.name} | Continent: {country.continent}</h2>
            <img src={country.flagImage} alt={`Flag of ${country.name}`}/>
            <h3>DETALLES:</h3>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} KM<sup>2</sup></p>
            <p>Population: {country.population}</p>
            <h3>Tourist Activities:</h3>
            {country.touristactivities && country.touristactivities.map(activity => {
                return <div key={activity.id}>
                          <p>Name:{activity.name}, Difficulty: {activity.difficulty} , Duration:{activity.duration}, Season: {activity.season}</p>
                       </div>
            })}
            <Link to='/home'><button>BACK HOME</button></Link>
        </div>
    ) 
    }
}
