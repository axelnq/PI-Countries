import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/LandingPage.module.css';

export default function LandingPage() {

    return (
        <div className={styles.landing}>
            <Link to='/home'>
                <button className={styles.landingButton}></button>
            </Link>
        </div>
    )
}