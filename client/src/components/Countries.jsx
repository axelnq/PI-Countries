import React from 'react';
import Country from './Country'


import styles from '../css/Countries.module.css';

export default function Countries({countriesPage}) {


    return (
        
        <div>
            <div className={styles.countriesContainer}>
                {countriesPage && countriesPage.map((country) => {
                    return <Country key={country.id} id={country.id} name={country.name} image={country.flagImage} continent={country.continent}/>
                }) }
            </div>
        </div>
    )
   
}