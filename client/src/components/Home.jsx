import React from 'react';
import Countries from './Countries'
import SearchBar from './SearchBar';
import Order from './Order';

export default function Home() {
    return (
        <div>
            <SearchBar/>
            <Order/>
            <Countries/>
        </div>
    )
}