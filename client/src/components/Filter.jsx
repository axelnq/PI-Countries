import React, { useState } from 'react';
import { CONTINENT, TOURIST_ACTIVITY } from "../constantes/Order"
import { useDispatch } from 'react-redux'
import { filterCountries } from '../store/actions'

export default function Filter() {
    const [input, setInput] = useState({
        value:'',
        type:''
    });
  
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            value: e.target.value
        })
        console.log(input)
    }

    const onSelectTypeChange = (e) => {
        setInput({
            ...input,
            type: e.target.value
        })
    }
    

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(filterCountries(input));
        setInput({
            value:'',
            type:''
        });        
    }



    return (
        <div>
            <input type="text" placeholder="Continent.." value={input.value} onChange={handleOnChange}/>
            <select defaultValue="" name="select" onChange={onSelectTypeChange}>
                <option value="" disabled hidden>Choose Type</option>
                <option value={CONTINENT}>Continent</option>
                <option value={TOURIST_ACTIVITY}>Tourist Activity</option>
            </select>
            <button onClick={handleClick}>Filter</button>
        </div>
    )
}