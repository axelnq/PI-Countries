import axios from 'axios';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const SORT = 'SORT';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_SEASON_ACTIVITY = 'FILTER_SEASON_ACTIVITY';
export const FETCH_COUNTRY_DETAIL = 'FETCH_COUNTRY_DETAIL';
export const RESET = 'RESET';
export const POST_ACTIVITY = 'POST_ACTIVITY';


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

export function sort(order) {
    return {
        type: SORT,
        payload: order
    }
}

export function filterCountriesContinent(filter) {
    return {
        type: FILTER_CONTINENT,
        payload:filter
    }
}

export function filterCountriesActivities(filter) {
    return {
        type: FILTER_SEASON_ACTIVITY,
        payload:filter
    }
}


export function postActivity(activity) {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/api/activity/',activity);
        try {
        dispatch({
            type: POST_ACTIVITY,
            payload: response.data   
        })
        } catch(e) {
            console.log(e)
        }
    }
}

export function resetFilters() {
    return {
        type:RESET
    }
}