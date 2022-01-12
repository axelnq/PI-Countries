import React from 'react';
import {Link} from 'react-router-dom';
import '../css/LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landing">
            <Link to='/home'>
            <button className="landing-button">ACCESS</button>
            {/* <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                Access
                </a>
            */}
            </Link>
            
        </div>
    )
}