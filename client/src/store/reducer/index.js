import { FETCH_COUNTRIES, SEARCH_COUNTRY } from '../actions';

const initialState = {
    countries: [],
    activities: []
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
        default:
            return state;
    }
}