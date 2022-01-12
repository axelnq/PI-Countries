import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry, fetchCountries } from '../store/actions'


export default function SearchBar() {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchCountry(search))
        setSearch('');
    }
    const reloadCountries = (e) => {
        e.preventDefault();
        dispatch(fetchCountries())
    }

    return (
        <div> 
            <input type="text" placeholder= 'Search country..' onChange={handleInputChange} 
             value={search}/>
            <button type="submit" onClick={handleSubmit}>Search</button>
            <button onClick={reloadCountries}>Reload all countries</button>
        </div>
    )
}