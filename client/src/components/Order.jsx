import { ASCENDING, DESCENDING, ALPHABETIC, POPULATION} from "../constantes/Order"
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { sort } from "../store/actions"


export default function Order() {
   
    const dispatch = useDispatch();

    const [select, setSelect] = useState({
         order: '',
         type: ''
    });

    const handleSelectChange = (e) => {
        setSelect({
            ...select,
            [e.target.name]: e.target.value
        })
    }
    
    const handleClick = (e) => {
      
        dispatch(sort(select));
    }

    return (
        <div>
        <select defaultValue="" name="order" onChange={handleSelectChange}>
            <option value="" disabled hidden>Choose Order</option>
            <option  value={ASCENDING}>Ascending</option>
            <option value={DESCENDING}>Descending</option>
        </select>

        <select defaultValue="" name="type" onChange={handleSelectChange}>
            <option value="" disabled hidden>Choose Type</option>
            <option  value={ALPHABETIC}>Alphabetic</option>
            <option value={POPULATION}>Population</option>
        </select>

        <button onClick={handleClick}>ORDER</button>
        </div>
    )
}