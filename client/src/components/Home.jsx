import React from 'react';
import Countries from './Countries'
import NavBar from './NavBar';
import styles from '../css/Home.module.css';


export default function Home() {
    return (
        <div className={styles.home}>
            <NavBar/>
            <Countries/>
        </div>
    )
}