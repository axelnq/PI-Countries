import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { filterCountries } from '../store/actions'

export default function Filter() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
        console.log(input)
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(filterCountries(input));
        setInput('');        
    }


    return (
        <div>
            <input type="text" placeholder="Continent.." value={input} onChange={handleOnChange}/>
            <button onClick={handleClick}>Filter</button>
        </div>
    )
}