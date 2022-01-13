import React from 'react';

import styles from '../css/Paged.module.css';


export default function Paged({page,countriesPerPage, allCountries, paged}) {

    const pageNumbers = [];
    // Al ser 250 paises y el PI requerir que en la primera pagina solo se vean 9 , sobra un pais , entonces sumamos 1 pagina
    for (let i = 1; i <=Math.ceil((allCountries/countriesPerPage)+1); i++) {
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