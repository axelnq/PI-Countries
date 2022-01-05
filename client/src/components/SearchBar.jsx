import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry } from '../store/actions'


export default function SearchBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    

    const inputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search)
        dispatch(searchCountry(search))
        setSearch('');
    }

    return (
        <div>   
            <input type="text" placeholder= 'Search country..' onChange={(e) => inputChange(e)} 
             value={search}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}