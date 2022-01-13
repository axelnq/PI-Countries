import React from 'react';
import {Link} from 'react-router-dom';
// import styles from '../css/LandingPage.css';
import styles from '../css/LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <Link to='/home'>
            <button className={styles.landingButton}>ACCESS</button>
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