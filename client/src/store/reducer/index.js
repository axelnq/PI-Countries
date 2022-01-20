import { FETCH_COUNTRIES, SEARCH_COUNTRY, SORT,FILTER_CONTINENT, FILTER_SEASON_ACTIVITY, FETCH_COUNTRY_DETAIL, RESET,POST_ACTIVITY} from '../actions';
import { ASCENDING,  ALPHABETIC } from "../../constantes/Order"

const initialState = {
    countries: [],
    allCountries: [],
    countryDetail: {},
    filteredCountriesContinent: [],
    filteredCountriesSeason: []
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
            
           
            let arrayToFilterContinent = [];
            state.filteredCountriesSeason.length > 0 ? arrayToFilterContinent = [...state.filteredCountriesSeason] : arrayToFilterContinent = [...state.allCountries];

            let arrayResultContinent = [];
            action.payload === 'All' ? arrayResultContinent = [...state.allCountries] :
            arrayResultContinent = arrayToFilterContinent.filter(country => country.continent === action.payload)
           
            return {
                ...state,
                countries: arrayResultContinent,
                filteredCountriesContinent:  arrayResultContinent
                
            }
        case FILTER_SEASON_ACTIVITY:
            
            let arrayToFilterSeason = [];
            state.filteredCountriesContinent.length > 0 ? arrayToFilterSeason = [...state.filteredCountriesContinent] : arrayToFilterSeason = [...state.allCountries]

            let arrayResultSeason = [];
            action.payload === 'All' ? arrayResultSeason = arrayToFilterSeason.filter(country => country.touristactivities.length > 0):
            arrayResultSeason = arrayToFilterSeason.filter(country => country.touristactivities.some(activity => activity.season === action.payload))

            return {
                
                ...state,
                countries: arrayResultSeason,
                filteredCountriesSeason:  arrayResultSeason
                
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
                filteredCountriesSeason: [],
                countries: state.allCountries
            }
        case POST_ACTIVITY:
            return {
                ...state
            }
        default:
            return state;
    }
}
