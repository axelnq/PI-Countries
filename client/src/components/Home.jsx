import React from 'react';
import Countries from './Countries'
import SearchBar from './SearchBar';
import Order from './Order';
import Filter from './Filter';
import {Link} from 'react-router-dom';
import styles from '../css/Home.module.css';

export default function Home() {
    return (
        <div>
            <nav className={styles.navBar}>
                <SearchBar/>
                <Order/>
                <Filter/>
                <Link to='/createActivity'><button>Create Activity</button></Link>
            </nav>
            <Countries/>
        </div>
    )
}