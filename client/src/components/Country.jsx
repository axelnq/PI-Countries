import React from 'react';
import '../css/Country.css';

export default function Country({name, image, continent}) {
    return(
        <div>
            <h3>Country: {name} | Continent: {continent}</h3>
            
            <img src={image} alt={`Flag of ${name}`}/>
        </div>
    )
}