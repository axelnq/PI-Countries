import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postActivity, fetchCountries} from '../store/actions' 
import {Link} from 'react-router-dom';

import styles from '../css/CreateActivity.module.css';


function validate(input){
    let errors = {};
    let array = ["Winter", "Spring", "Summer", "Fall"];

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
    } /*else if (isNaN(input.duration)) {
        errors.duration = "Must be a number"
    }*/
   
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

    const countries = useSelector((state) => state.countries)
   

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
       
        validateForm(validate({...activity,
            countriesArray: [...activity.countriesArray, e.target.value]}));

        setActivity({...activity,countriesArray: [...activity.countriesArray, e.target.value]})
        
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
            <div>CREATE ACTIVITY</div>

            <form className={styles.formActivity}onSubmit={handleSubmit}>
                <div className={styles.nameField}>
                    <label>Name</label>
                    
                    <input className={error.name && styles.danger} type="text" name="name" value={activity.name} onChange={handleChange}/>
                    {error.name && (
                        <span className={styles.danger}>{error.name}</span>
                    )}
                </div>
                <div className={styles.difficultyField}>
                    <label>Difficulty</label>
                    <input className={error.difficulty && styles.danger} type="range" min="1" max="5" name="difficulty" value={activity.difficulty} onChange={handleChange}/><span>{activity.difficulty}</span>
                    {error.difficulty && (
                        <span className={styles.danger}>{error.difficulty}</span>
                    )}
                </div>
                <div className={styles.durationField}>
                    <label>Duration</label>
                    <input className={error.duration && styles.danger} type="text" name="duration" value={activity.duration} onChange={handleChange}/>
                    {error.duration && (
                        <span className={styles.danger}>{error.duration}</span>
                    )}
                    
                </div>
                <div className={styles.seasonField}>
                    <label className={error.season && styles.danger}>Season</label>
                    <br/>
                    
                    <label>Summer<input  type="radio" name="season" value="Summer" onChange={handleCheck}/></label>
                    <label>Spring<input  type="radio" name="season" value="Spring" onChange={handleCheck}/></label>
                    <label>Fall<input  type="radio" name="season" value="Fall" onChange={handleCheck}/></label>
                    <label>Winter<input type="radio" name="season" value="Winter" onChange={handleCheck}/></label>
                    {error.season && (
                        <span className={styles.danger}>{error.season}</span>
                    )}
                    
                </div>
                
               
                <div className={styles.countriesField}>
                    <select value={activity.countriesArray}  onChange={handleSelect}>
                        <option value="" disabled hidden>Choose Country</option>
                        {countries && countries.map((country) =>{
                        
                        return <option key={country.id} value={country.id}>{country.name}</ option>
                    })}
                    </select>
                
                   
                </div>
              
                
                {disabled ? null : <input className={styles.inputForm} type="submit" value="CREATE"/>}
                
            </form>
            <ul className={styles.listForm}>{activity.countriesArray && activity.   countriesArray.map((country,index) => {
                       let countryFind = countries.find(c => c.id === country);
                      
                    return <li className={styles.listImage} key={index}>
                                <h3>{countryFind.name}</h3>
                                <img src={countryFind.flagImage} alt={`${country}`}></img>
                           </li>
                    })}</ul>
                    {error.countriesArray && (
                        <span className={styles.danger}>{error.countriesArray}</span>
                    )}

            <Link to='/home'><button>BACK HOME</button></Link>
        </div>
    )
}