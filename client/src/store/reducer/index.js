import { FETCH_COUNTRIES, SEARCH_COUNTRY, SORT,FILTER, FILTER_CONTINENT, FILTER_SEASON_ACTIVITY, FETCH_COUNTRY_DETAIL, RESET} from '../actions';
import { ASCENDING, DESCENDING, ALPHABETIC, POPULATION, CONTINENT, TOURIST_ACTIVITY} from "../../constantes/Order"

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    countryDetail: {},
    filteredCountriesContinent: [],
    filteredCountriesSeason: []
}

const filterCountries = (state,action,type) => {
    let otherFilter = []
    if(type === FILTER_CONTINENT) {
        otherFilter = state.filteredCountriesSeason;
    } else {
        otherFilter = state.filteredCountriesContinent
    }
    let arrayToFilter = [];
    otherFilter.length > 0 ? arrayToFilter = [...otherFilter] : arrayToFilter = [...state.allCountries];

    let resultArray = [];
    action.payload === 'All' ? resultArray = [...state.allCountries] : 
    type === FILTER_CONTINENT ? 
    resultArray = arrayToFilter.filter(country => country.continent === action.payload) : resultArray = arrayToFilter.filter(country => country.touristactivities.some(activity => activity.season === action.payload))

    return resultArray;
}

    

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                filteredCountriesContinent: [],
                filteredCountriesSeason: []
            }
        case SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload
            }
        case SORT: 
            let orderedCountries = [...state.countries]
            let type = action.payload.type; 
            let typeOrder = '';
            type && type === ALPHABETIC ? typeOrder = 'name' :  typeOrder = 'population';
            orderedCountries.sort(function (a, b) {
                if (a[typeOrder] > b[typeOrder]) {
                    return action.payload.order === ASCENDING ? 1 : -1;
                }
                if (a[typeOrder] < b[typeOrder]) {
                    return action.payload.order === ASCENDING ? -1 : 1;
                }
                return 0;
            })
            
            return {
                ...state,
                countries: orderedCountries
            }
        case FILTER_CONTINENT:
            /*
            let countriesContinent = [];
            state.filteredCountriesSeason.length > 0 ? countriesContinent = [...state.filteredCountriesSeason] : countriesContinent = [...state.allCountries];

            let continentFilter = [];
            action.payload === 'All' ? continentFilter = [...state.allCountries] :
            continentFilter = countriesContinent.filter(country => country.continent === action.payload)
           */
            let continentFilter = filterCountries(state,action,FILTER_CONTINENT);
            return {
                
                ...state,
                countries: continentFilter,
                filteredCountriesContinent: action.payload === 'All' ? [] : continentFilter
                
            }
        case FILTER_SEASON_ACTIVITY:
            /*
            let countriesSeason = [];
            state.filteredCountriesContinent.length > 0 ? countriesSeason = [...state.filteredCountriesContinent] : countriesSeason = [...state.allCountries]

            let seasonFilter = [];
            action.payload === 'All' ? seasonFilter = [...state.allCountries]: seasonFilter = countriesSeason.filter(country => country.touristactivities.some(activity => activity.season === action.payload))
            */

            let seasonFilter = filterCountries(state,action,FILTER_SEASON_ACTIVITY);

            return {
                
                ...state,
                countries: seasonFilter,
                filteredCountriesSeason: action.payload === 'All' ? [] : seasonFilter
                
            }
       
        case FETCH_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        case RESET:
            return {
                ...state,
                filteredCountriesContinent: [],
                filteredCountriesSeason: []
            }
        default:
            return state;
    }
}