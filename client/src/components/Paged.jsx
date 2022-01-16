import React from 'react';

import styles from '../css/Paged.module.css';


export default function Paged({page,countriesPerPage, allCountries, paged}) {

    const pageNumbers = [];
    
    for (let i = 1; i <=Math.ceil(((allCountries+1)/countriesPerPage)); i++) {
        pageNumbers.push(i);
    }
  
    return (
        <ul className={styles.pages}>
             { pageNumbers && pageNumbers.map(pageNumber =>{
                    return <li  key={pageNumber}><button onClick={() => paged(pageNumber)}>{pageNumber}</button></li>
     })}

        </ul>
    )
}