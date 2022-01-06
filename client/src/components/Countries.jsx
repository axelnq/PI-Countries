import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../store/actions' 
import Country from './Country'

export default function Countries() {

    let countries = useSelector((state) => state.countries)
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])
    
    return (
        
        <div>
     
            {countries && countries.map((country,index) => {
                return <Country key={index} name={country.name} image={country.flagImage} continent={country.continent}/>
            }) }
          
        </div>
    )
}