import React from 'react';
import Countries from './Countries'
import SearchBar from './SearchBar';

export default function Home() {
    return (
        <div>
            Soy el Home
            <SearchBar/>
            <Countries/>
        </div>
    )
}