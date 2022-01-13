import React, { useState, useRef  } from 'react';
// import { CONTINENT, TOURIST_ACTIVITY } from "../constantes/Order"
import { useDispatch } from 'react-redux'
import { filterCountriesContinent, filterCountriesActivities, resetFilters} from '../store/actions'


export default function Filter() {

    const selectRefC = useRef(null);
    const selectRefS= useRef(null);
    const dispatch = useDispatch();
 
    const handleClick = (e) => {
        dispatch(resetFilters());
        selectRefC.current.value = "";
        selectRefS.current.value = "";
    }
    
   
    const handleContinentFilter = (e) => {
        dispatch(filterCountriesContinent(e.target.value));

    }
    
    const handleSeasonFilter = (e) => {
        dispatch(filterCountriesActivities(e.target.value));
    }
  
    return (
        <div>
            <select ref={selectRefC} defaultValue="" name="continent" onChange={handleContinentFilter}>
                <option value="" disabled hidden>Choose Continent</option>
                <option value="All">All</option>
                <option value="Antarctic">Antarctic</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            <select ref={selectRefS} defaultValue="" name="season" onChange={handleSeasonFilter}>
                <option value="" disabled hidden>Choose type of activity</option>
                <option value="All">All</option>
                <option value="Summer">Summer</option>
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
            </select>
            
            <button onClick={handleClick}>Reset Filters</button>
        </div>
    )
}
