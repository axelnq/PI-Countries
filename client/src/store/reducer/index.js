import { FETCH_COUNTRIES, SEARCH_COUNTRY, SORT, FILTER, FETCH_COUNTRY_DETAIL} from '../actions';
import { ASCENDING, DESCENDING, ALPHABETIC, POPULATION, CONTINENT, TOURIST_ACTIVITY} from "../../constantes/Order"

const initialState = {
    countries: [],
    activities: [],
    countryDetail: {}
}

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload
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
            console.log('array ordenado', orderedCountries)
            return {
                ...state,
                countries: orderedCountries
            }
        case FILTER:
           
            let typeFilter = action.payload.type;
            
            let filteredCountries = state.countries.filter(country => {
                return typeFilter === TOURIST_ACTIVITY ? country.touristactivities.some(activity => activity.season === action.payload.value): country.continent === action.payload.value
            }
            )
            console.log()
            
            return {
                ...state,
                countries: filteredCountries
            }
        case FETCH_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }

        default:
            return state;
    }
}