import React from 'react';
import '../css/Country.css';
import {Link} from 'react-router-dom';

export default function Country({name, image, continent, id}) {
    return(
        <div>
            <Link to={`/detail/${id}`}>
                <h3>Country: {name} | Continent: {continent}</h3>
                <img src={image} alt={`Flag of ${name}`}/>
            </Link>
        </div>
    )
}