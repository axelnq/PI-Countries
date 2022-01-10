import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../store/actions' 
import Country from './Country'
import Loading from './Loading'
import Paged from './Paged'

export default function Countries() {

    let countries = useSelector((state) => state.countries)
    let dispatch = useDispatch();
    let contador = 0;
    countries.forEach(country => contador++)
    

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    let lastCountryIndex = countriesPerPage * page; // 18 // 27
    let firstCountryIndex = lastCountryIndex - countriesPerPage; // 9
   
    let countriesPage = []
    if(page === 1) {
        console.log('firstIndex page 1',firstCountryIndex)
        console.log('lastIndex page 1',lastCountryIndex)
        countriesPage = countries.slice(firstCountryIndex,lastCountryIndex-1)
    } else {
        console.log(`firstIndex ${firstCountryIndex} ${page}`)
        console.log(`lastCountryIndex ${lastCountryIndex} ${page}`)
        countriesPage = countries.slice(firstCountryIndex-1,lastCountryIndex-1);
    }
    
 
    console.log(countriesPage);

    let paged = (numberPage) =>{
        setPage(numberPage)
    }


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
            <Paged countriesPerPage={countriesPerPage} allCountries={countries.length} paged={paged}/>
            
            {countriesPage && countriesPage.map((country) => {
                return <Country key={country.id} id={country.id} name={country.name} image={country.flagImage} continent={country.continent}/>
            }) }
          
        </div>
    )
    }
}