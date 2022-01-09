import axios from 'axios';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const SORT = 'SORT';
export const FILTER = 'FILTER';
export const FETCH_COUNTRY_DETAIL = 'FETCH_COUNTRY_DETAIL';


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

export function searchCountry(name) {
    return async function(dispatch) {
        try {
            let countries = await axios.get('http://localhost:3001/api/countries?name=' + name)
            dispatch({
                type: SEARCH_COUNTRY,
                payload: countries.data   
            })
        } catch (e) {
             console.log(e)
        }
    }
}

export function sort(order) {
    return {
        type: SORT,
        payload: order
    }
}

export function filterCountries(continent) {
    return {
        type: FILTER,
        payload:continent
    }
}
/*
export function fetchCountry(name) {
    return async function(dispatch) {
        try {
            let countries = await axios.get('http://localhost:3001/api/countries?name=' + name)
            dispatch({
                type: SEARCH_COUNTRY,
                payload: countries.data   
            })
        } catch (e) {
             console.log(e)
        }
    }
}
*/

export  function fetchCountryDetail(id) {
    return async function(dispatch) {
        try {
            let countries = await axios.get('http://localhost:3001/api/countries/' + id)
            dispatch({
                type: FETCH_COUNTRY_DETAIL,
                payload: countries.data   
            })
        } catch (e) {
             console.log(e)
        }
     
    }
}

export function postActivity(activity) {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/api/activity/',activity);

        return response.data;
    }
}