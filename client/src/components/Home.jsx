import React from 'react';
import Countries from './Countries'
import SearchBar from './SearchBar';
import Order from './Order';
import Filter from './Filter';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <SearchBar/>
            <Order/>
            <Filter/>
            <Link to='/createActivity'><button>Create Activity</button></Link>
            <Countries/>
        </div>
    )
}