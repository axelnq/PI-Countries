import React, { useState } from 'react';
// import { CONTINENT, TOURIST_ACTIVITY } from "../constantes/Order"
import { useDispatch } from 'react-redux'
import { filterCountriesContinent, filterCountriesActivities, resetFilters} from '../store/actions'
import styles from '../css/Filter.module.css';




export default function Filter() {

    const dispatch = useDispatch();
    const [select , setSelect] = useState({
        continent:"",
        season:""
    })
 
    const handleClick = (e) => {
        dispatch(resetFilters());
        setSelect({
            continent:"",
            season:""
        })
    }
    
   
    const handleSelects = (e) => {
        setSelect({...select,[e.target.name]:e.target.value})
        if(e.target.name === "continent") {
           dispatch(filterCountriesContinent(e.target.value));
        } else {
           dispatch(filterCountriesActivities(e.target.value));
        }
    }
    /*
    const handleContinentFilter = (e) => {
        setSelect({...select,[e.target.name]:e.target.value})
        dispatch(filterCountriesContinent(e.target.value));
    }
    
    const handleSeasonFilter = (e) => {
        setSelect({...select,[e.target.name]:e.target.value})
        dispatch(filterCountriesActivities(e.target.value));
    }
    */
  
    return (
        <div className={styles.filterContainer}>
            <select value={select.continent} defaultValue="" name="continent" onChange={handleSelects}>
                <option value="" disabled hidden>Choose Continent</option>
                <option value="All">All</option>
                <option value="Antarctic">Antarctic</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            <select value={select.season}defaultValue="" name="season" onChange={handleSelects}>
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
