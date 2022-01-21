import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postActivity, fetchCountries} from '../store/actions' 
import {Link} from 'react-router-dom';

import styles from '../css/CreateActivity.module.css';


function validate(input){
    let errors = {};
    let array = ["Winter", "Spring", "Summer", "Fall"];
    let durationConditions = ["hours","minutes"]

    if(!input.name) {
        errors.name = 'Name is required';
    }
    if(!input.difficulty){
        errors.difficulty = 'Difficulty is required';
    } else if(input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = 'Difficulty must be between 1 and 5';
    }
    

    if(!input.duration) {
        errors.duration = 'Duration is required';
    } else if(!(durationConditions.some(el => input.duration.toLowerCase().includes(el)))) {
        errors.duration = "Especify if the duration is hours or minutes"
    } 
    
   
    if(!input.season) {
        errors.season = 'Select a season is required';
    } else if(!(array.includes(input.season))){
        errors.season = 'Not a valid season';
    }

    if(!(input.countriesArray.length > 0)) {
        errors.countriesArray = "At least one country is required";
    } 
   

    return errors;
}



export default function CreateActivity() {


    const [activity, setActivity] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countriesArray:""
    })

    const [error, setError] = useState({});

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countries);

    let orderedCountries = [...countries];
    orderedCountries.sort(function (a, b) {
        if (a.name > b.name) {
            return  1;
        }
        if (a.name < b.name) {
            return  -1
        }
        return 0;
    })
    
   

    useEffect(() => {
        dispatch(fetchCountries())
    },[dispatch])
    
  
    let validateForm = (errors) => {
        let valid = true;
        setError(errors);
        Object.values(errors).forEach( (val) => val.length > 0 && (valid = false)
        );
    
        if(valid){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    
    let handleChange = (e) => {

        validateForm(validate({...activity,[e.target.name]:e.target.value}));
        setActivity((prev) => ({...prev, [e.target.name]:e.target.value}))

    }
    
    let handleCheck = (e) => {

        validateForm(validate({...activity,[e.target.name]:e.target.value}));

        if(e.target.checked) {
            setActivity({...activity,[e.target.name]: e.target.value})
        }

    }

    let handleSelect = (e) => {

        if(!activity.countriesArray.includes(e.target.value)){
            validateForm(validate({...activity,
                countriesArray: [...activity.countriesArray, e.target.value]}));
    
            setActivity({...activity,countriesArray: [...activity.countriesArray, e.target.value]})
        }
        
    }

    let deleteCountry = (id) => {
        
        let countriesArrayFilter = activity.countriesArray.filter(countryId => countryId !== id)
        validateForm(validate({...activity,countriesArray:countriesArrayFilter}))
        setActivity({...activity,countriesArray:countriesArrayFilter})
        
    }

    let handleSubmit =  (e) => {

        e.preventDefault();
       
        if(Object.keys(error).length === 0){
            dispatch(postActivity(activity));
            setActivity({
                name:"",
                difficulty:"",
                duration:"",
                season:"",
                countriesArray:""
            })
            setDisabled(true);

        alert("Successfully created activity");
        } else {
            for(let keys in error){
                alert("Error: " + error[keys])
            }
        }
        
        
    }

    return (
        <div>
            <h2>CREATE ACTIVITY</h2>

            <form className={styles.formActivity}onSubmit={handleSubmit}>
                <div className={styles.nameField}>
                    <label>Name</label>
                    
                    <input className={error.name && styles.danger} type="text" name="name" placeholder="Activity name"value={activity.name} onChange={handleChange}/>
                    {error.name && (
                        <span className={styles.danger}>{error.name}</span>
                    )}
                </div>
                <div className={styles.difficultyField}>
                    <label>Difficulty</label>
                    <input className={error.difficulty && styles.danger} type="range" min="1" max="5" name="difficulty" value={activity.difficulty} onChange={handleChange}/><span className={styles.spanDiff}>{activity.difficulty}</span>
                    {error.difficulty && (
                        <span className={styles.danger}>{error.difficulty}</span>
                    )}
                </div>
                <div className={styles.durationField}>
                    <label>Duration</label>
                    <input placeholder="Duration in minutes or hours"className={error.duration && styles.danger} type="text" name="duration" value={activity.duration} onChange={handleChange}/>
                    {error.duration && (
                        <span className={styles.danger}>{error.duration}</span>
                    )}
                    
                </div>
                <div className={styles.seasonField}>
                    <label className={error.season && styles.danger}>Season</label>
                    <br/>
                    
                    <label>Summer</label><input  type="radio" name="season" value="Summer" onChange={handleCheck}/>
                    <label>Spring</label><input  type="radio" name="season" value="Spring" onChange={handleCheck}/>
                    <label>Fall</label><input  type="radio" name="season" value="Fall" onChange={handleCheck}/>
                    <label>Winter</label><input type="radio" name="season" value="Winter" onChange={handleCheck}/>
                    
                </div>
                {error.season && (
                        <span className={styles.danger}>{error.season}</span>
                    )}
                    
               
                <div className={styles.countriesField}>
                    <select value={activity.countriesArray}  onChange={handleSelect}>
                        <option value="" disabled hidden>Choose 1 or more countries</option>
                        {orderedCountries && orderedCountries.map((country) =>{
                        
                        return <option key={country.id} value={country.id}>{country.name}</ option>
                    })}
                    </select>
                
                   
                </div>
                {error.countriesArray && (
                        <span className={styles.danger}>{error.countriesArray}</span>
                    )}
                
                {disabled ? null : <input className={styles.inputForm} type="submit" value="CREATE"/>}
                
            </form>
            <ul className={styles.listForm}>{activity.countriesArray && activity.   countriesArray.map((country,index) => {
                       let countryFind = countries.find(c => c.id === country);
                      
                    return <li className={styles.listImage} key={index}>
                                <div>
                                <h3>{countryFind.name}</h3>
                                <button onClick={() => deleteCountry(country)}>X</button>
                                </div>
                                <img src={countryFind.flagImage} alt={`${country}`}></img>
                           </li>
                    })}</ul>
                   

            <Link to='/home'>
                
                <button className={styles.homeButton}>
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back Home</span>
</button>
            </Link>
        </div>
    )
}