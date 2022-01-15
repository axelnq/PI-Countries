import React from 'react';

import styles from '../css/Loading.module.css';
/* https://acegif.com/wp-content/gifs/globe-13.gif */

export default function Loading(){
    return(
        <div className={styles.loadingContainer}>
            <h1>Loading...</h1>
            <img alt="Loading" src="https://acegif.com/wp-content/gifs/globe-13.gif"/>
        </div>
    )
}