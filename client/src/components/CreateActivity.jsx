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
     
        let objError = validate({...input,[e.target.name]:e.target.value})
        
        setError(objError);
       
        validateForm(objError);

    }
    let  handleSubmit =  (e) => {
        e.preventDefault();
        let promise = dispatch(postActivity(input));
        promise.then ((value) => {
            input.countriesArray && input.countriesArray.map(async country => {
                const response = await axios.post(`http://localhost:3001/api/countries/${country}/activity/${value.id}`);
            })
        })
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
                    <input type="text" name="difficulty" value={input.difficulty} onChange={handleChange}/>
                </div>
                <div>
                    <label>Duration</label>
                    <input type="text" name="duration" value={input.duration} onChange={handleChange}/>
                </div>
                <div>
                    <label>Season</label>
                    <br/>
                    <label><input type="radio" name="season" value="Summer" onChange={handleCheck}/>Summer</label>
                    <label><input type="radio" name="season" value="Spring" onChange={handleCheck}/>Spring</label>
                    <label><input type="radio" name="season" value="Fall" onChange={handleCheck}/>Fall</label>
                    <label><input type="radio" name="season" value="Winter" onChange={handleCheck}/>Winter</label>
                </div>
                
               
                <div>
                <select onChange={handleSelect}>
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