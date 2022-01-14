import React from 'react';
import SearchBar from './SearchBar';
import Order from './Order';
import Filter from './Filter';
import {Link} from 'react-router-dom';
import styles from '../css/NavBar.module.css';

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <SearchBar/>   
            <Order/>
            <Filter/>
            <Link to='/createActivity'><button className={styles.createButton}>Create Activity</button></Link>
        </div>
    )
}