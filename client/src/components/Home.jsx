import React from 'react';
import Countries from './Countries'
import SearchBar from './SearchBar';
import Order from './Order';
import Filter from './Filter';

export default function Home() {
    return (
        <div>
            <SearchBar/>
            <Order/>
            <Filter/>
            <Countries/>
        </div>
    )
}