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
            {/* ESTA SOLUCION ES TEMPORAL PORQUE AL HACER LA BUSQUEDA DEJA DE SER UN ARRAY Y PASAR A SER UN UNICO OBJETO Y NO SE PUEDE USAR EL MAP*/}
            {console.log('LOS PAISES SON'+ countries.length)}
            {countries.length > 1 ? countries.map((country,index) => {
                return <Country key={index} name={country.name} image={country.flagImage} continent={country.continent}/>
            }) : <Country  name={countries.name} image={countries.flagImage} continent={countries.continent}/>}
            
            
        </div>
    )
}