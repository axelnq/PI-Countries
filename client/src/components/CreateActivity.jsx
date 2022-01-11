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
   

    return errors;
}



export default function CreateActivity() {


    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countriesArray:[]
    })

    const [error, setError] = useState({});

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch(fetchCountries())
    },[])
    
    
    
    const countries = useSelector((state) => state.countries)


    let validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach( (val) => val.length > 0 && (valid = false)
        );
    
        if(valid){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    
    let handleChange = (e) => {
        
        
        setInput((prev) => ({...prev, [e.target.name]:e.target.value}))
        console.log(e.target.name)
        let objError = validate({...input,[e.target.name]:e.target.value})
        
        setError(objError);
       
        validateForm(objError);

    }
    let  handleSubmit =  (e) => {
        e.preventDefault();
       
        dispatch(postActivity(input));
        /*
        let promise = dispatch(postActivity(input));
        promise.then ((value) => {
            input.countriesArray && input.countriesArray.map(async country => {
                const response = await axios.post(`http://localhost:3001/api/countries/${country}/activity/${value.id}`);
            })
        })
        */
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countriesArray:[]
        })
        
    }
    let handleCheck = (e) => {
     
        if(e.target.checked) {
            let objError = validate({...input,[e.target.name]:e.target.value})
            setError(objError);
            validateForm(objError);
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    let handleSelect = (e) => {
        setInput({
            ...input,
            countriesArray: [...input.countriesArray, e.target.value]
        })
    }

    return (
        <div>
            <div>CREATE ACTIVITY</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    
                    <input className={error.name && 'danger'} type="text" name="name" value={input.name} onChange={handleChange}/>
                    {error.name && (
                        <span className="danger">{error.name}</span>
                    )}
                </div>
                <div>
                    <label>Difficulty</label>
                    <input className={error.difficulty && 'danger'} type="range" min="1" max="5" name="difficulty" value={input.difficulty} onChange={handleChange}/><span>{input.difficulty}</span>
                    {error.difficulty && (
                        <span className="danger">{error.difficulty}</span>
                    )}
                </div>
                <div>
                    <label>Duration</label>
                    <input className={error.duration && 'danger'} type="text" name="duration" value={input.duration} onChange={handleChange}/>
                    {error.duration && (
                        <span className="danger">{error.duration}</span>
                    )}
                    
                </div>
                <div>
                    <label>Season</label>
                    <br/>
                    
                    <label><input  type="radio" name="season" value="Summer" onChange={handleCheck}/>Summer</label>
                    <label><input  type="radio" name="season" value="Spring" onChange={handleCheck}/>Spring</label>
                    <label><input  type="radio" name="season" value="Fall" onChange={handleCheck}/>Fall</label>
                    <label><input type="radio" name="season" value="Winter" onChange={handleCheck}/>Winter</label>
                    
                </div>
                
               
                <div>
                <select defaultValue="" onChange={handleSelect}>
                <option value="" disabled hidden>Choose Country</option>
                    {countries && countries.map((country) =>{
                        return <option key={country.id}value={country.id}>{country.name}</option>
                    })}
                </select>

                <ul>{input.countriesArray && input.countriesArray.map((country,index) => {
                    return <li key={index}>{country}</li>
                })}</ul>
                </div>
              
                <br/>
                {disabled ? null : <input  type="submit" value="CREATE"/>}
                
                
                
            </form>

            <Link to='/home'><button>BACK HOME</button></Link>
        </div>
    )
}