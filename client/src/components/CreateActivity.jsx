import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postActivity, fetchCountries} from '../store/actions' 
import {Link} from 'react-router-dom';
import '../css/CreateActivity.css';
import axios from 'axios'

function validate(input){
    let errors = {};

    if(!input.name) {
        errors.name = 'Name is required';
    }

    if(input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = 'Difficulty must be between 1 and 5';
    }

    if(!input.duration) {
        errors.duration = 'Duration is required';
    } /*else if (isNaN(input.duration)) {
        errors.duration = "Must be a number"
    }*/
   
    if(!input.season) {
        errors.season = 'Select a season is required';
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
        countriesArray:[]
    })

    const [error, setError] = useState({});

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countries)
   

    useEffect(() => {
        dispatch(fetchCountries())
    },[])
    
  
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
        
            
            setActivity({
                ...activity,
                [e.target.name]: e.target.value
            })
        }

    }

    let handleSelect = (e) => {
        
        validateForm(validate({...activity,countriesArray: [...activity.countriesArray, e.target.value]}));
        setActivity({
            ...activity,
            countriesArray: [...activity.countriesArray, e.target.value]
        })
    }

    let  handleSubmit =  (e) => {
        e.preventDefault();
       
        dispatch(postActivity(activity));
        setActivity({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countriesArray:""
        })
        alert("Successfully created activity");
        
        
    }

    return (
        <div>
            <div>CREATE ACTIVITY</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    
                    <input className={error.name && 'danger'} type="text" name="name" value={activity.name} onChange={handleChange}/>
                    {error.name && (
                        <span className="danger">{error.name}</span>
                    )}
                </div>
                <div>
                    <label>Difficulty</label>
                    <input className={error.difficulty && 'danger'} type="range" min="1" max="5" name="difficulty" value={activity.difficulty} onChange={handleChange}/><span>{activity.difficulty}</span>
                    {error.difficulty && (
                        <span className="danger">{error.difficulty}</span>
                    )}
                </div>
                <div>
                    <label>Duration</label>
                    <input className={error.duration && 'danger'} type="text" name="duration" value={activity.duration} onChange={handleChange}/>
                    {error.duration && (
                        <span className="danger">{error.duration}</span>
                    )}
                    
                </div>
                <div>
                    <label className={error.season && 'danger'}>Season</label>
                    <br/>
                    
                    <label><input  type="radio" name="season" value="Summer" onChange={handleCheck}/>Summer</label>
                    <label><input  type="radio" name="season" value="Spring" onChange={handleCheck}/>Spring</label>
                    <label><input  type="radio" name="season" value="Fall" onChange={handleCheck}/>Fall</label>
                    <label><input type="radio" name="season" value="Winter" onChange={handleCheck}/>Winter</label>
                    {error.season && (
                        <span className="danger">{error.season}</span>
                    )}
                    
                </div>
                
               
                <div>
                <select defaultValue="" onChange={handleSelect}>
                <option value=""disabled hidden>Choose Country</option>
                    {countries && countries.map((country) =>{
                        return <option key={country.id}value={country.id}>{country.name}</option>
                    })}
                </select>
                
                <ul className={error.countriesArray && 'danger'}>{activity.countriesArray && activity.countriesArray.map((country,index) => {
                    return <li key={index}>{country}</li>
                })}</ul>
                {error.countriesArray && (
                        <span className="danger">{error.countriesArray}</span>
                    )}
                </div>
              
                <br/>
                {disabled ? null : <input  type="submit" value="CREATE"/>}
                
                
                
            </form>

            <Link to='/home'><button>BACK HOME</button></Link>
        </div>
    )
}