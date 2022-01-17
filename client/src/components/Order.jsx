import { ASCENDING, DESCENDING, ALPHABETIC, POPULATION} from "../constantes/Order"
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { sort, fetchCountries } from "../store/actions"
import styles from '../css/Order.module.css';


export default function Order() {
   
    const dispatch = useDispatch();

    const [select, setSelect] = useState({
         order: '',
         type: ''
    });

    const [disabled, setDisabled] = useState(true);
  
    const handleSelectChange = (e) => {
        setSelect({
            ...select,
            [e.target.name]: e.target.value
        })

        if(e.target.name === 'order' && select.type !== ''){
             setDisabled(false);
        }

        if(e.target.name === 'type' && select.order !== ''){
            setDisabled(false);
       }

        
    }
    
    const handleClick = (e) => {
        dispatch(sort(select));
        setDisabled(true);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setDisabled(true);
        dispatch(fetchCountries())
        setSelect({
            order: '',
            type: ''
        })
    }

    return (
        <div className={styles.orderContainer}>

        <select value={select.type} name="type" onChange={handleSelectChange}>
            <option value="" disabled hidden>Type</option>
            <option  value={ALPHABETIC}>Alphabetic</option>
            <option value={POPULATION}>Population</option>
        </select>

        <select value={select.order} name="order" onChange={handleSelectChange}>
            <option value="" disabled hidden>Order</option>
            <option  value={ASCENDING}>Ascending</option>
            <option value={DESCENDING}>Descending</option>
        </select>

        {disabled ? <button disabled onClick={handleClick}>Sort</button>: <button onClick={handleClick}>Sort</button>}

        <button onClick={handleReset}>Reset Sort</button>
        </div>
    )
}