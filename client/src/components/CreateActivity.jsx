import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postActivity, fetchCountries} from '../store/actions' 
import {Link} from 'react-router-dom';
import '../css/CreateActivity.css';

export default function CreateActivity() {


    let [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countriesArray:[]
    })

    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch(fetchCountries())
    },[])
 
    
    const countries = useSelector((state) => state.countries)
    
    let handleChange = (e) => {
        e.preventDefault();
        setInput((prev) => ({...prev, [e.target.name]:e.target.value}))
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivity(input));
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:""
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
                    <input type="text" name="name" value={input.name} onChange={handleChange}/>
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
                        return <option value={country.name}>{country.name}</option>
                    })}
                </select>

                <ul>{input.countriesArray.map((country) => {
                    return <li>{country}</li>
                })}</ul>
                </div>

                <br/>
                <input type="submit" value="CREATE"/>
                
                
            </form>

            <Link to='/home'><button>BACK HOME</button></Link>
        </div>
    )
}