import axios from 'axios';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';


export  function fetchCountries() {
    return async function(dispatch) {
        try {
            let countries = await axios.get('http://localhost:3001/api/countries/')
            dispatch({
                type: FETCH_COUNTRIES,
                payload: countries.data   
            })
        } catch (e) {
             console.log(e)
        }
        /*
        axios.get('http://localhost:3001/api/countries/')
        .then((countries) => {
            dispatch({
                type: FETCH_COUNTRIES,
                payload: countries
            })
        })
        .catch((error) => {
            console.log(error)
        })
        */
    }
}

export function searchCountry(id) {
    return async function(dispatch) {
        try {
            let countries = await axios.get('http://localhost:3001/api/countries/' + id)
            console.log(countries);
            dispatch({
                type: SEARCH_COUNTRY,
                payload: countries.data   
            })
        } catch (e) {
             console.log(e)
        }
    }
}