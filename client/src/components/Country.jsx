import React from 'react';

import styles from '../css/Country.module.css';
import {Link} from 'react-router-dom';

export default function Country({name, image, continent, id}) {
    return(
        <div className={styles.countryCard}>
            <Link  title='Click for more information' to={`/detail/${id}`}>
                <img src={image} alt={`Flag of ${name}`}/>
                <div className={styles.countryInfo}>
                    <h2>{name}</h2>
                    <h3>Continent: {continent}</h3>
                </div>
            </Link>
        </div>
    )
}