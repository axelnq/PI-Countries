import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../store/actions' 
import Country from './Country'
import Loading from './Loading'

export default function Countries() {

    let countries = useSelector((state) => state.countries)
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
        dispatch(fetchCountries())
    }, [dispatch])
    
    if(loading) {
        return (
            <div>
            <Loading/>
            </div>
        )
    } else {

    return (
        
        <div>
            {console.log(countries)}
            {countries && countries.map((country) => {
                return <Country key={country.id} id={country.id} name={country.name} image={country.flagImage} continent={country.continent}/>
            }) }
          
        </div>
    )
    }
}