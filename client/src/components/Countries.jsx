import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../store/actions' 
import Country from './Country'
import Loading from './Loading'
import Paged from './Paged'

import styles from '../css/Countries.module.css';

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


     // Paginated 
     
     const [page, setPage] = useState(1);
     const countriesPerPage = 10;
     let lastCountryIndex = countriesPerPage * page;
     let firstCountryIndex = lastCountryIndex - countriesPerPage; 
    
     let countriesPage = []
     
     if(page === 1) {
         countriesPage = countries.slice(firstCountryIndex,lastCountryIndex-1)
     } else {
         countriesPage = countries.slice(firstCountryIndex-1,lastCountryIndex-1);
     }
     
 
     let paged = (numberPage) =>{
         setPage(numberPage)
     }
 
     // Paginated
    
    if(loading) {
        return (
            <div>
            <Loading/>
            </div>
        )
    } else {

    return (
        
        <div>
            <Paged page={page}countriesPerPage={countriesPerPage} allCountries={countries.length} paged={paged}/>

            <div className={styles.countriesContainer}>
                {countriesPage && countriesPage.map((country) => {
                    return <Country key={country.id} id={country.id} name={country.name} image={country.flagImage} continent={country.continent}/>
                }) }
            </div>
        </div>
    )
    }
}